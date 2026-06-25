# Meta Model DSL

::: warning 专业版功能
Meta Model DSL，也叫 Meta Module Language，是专业版提供的元模型路由语言。社区版不会注册元模型数据表、管理接口和运行时解析 Hook。
:::

元模型是对外暴露给用户和 API 密钥的虚拟模型名。请求进入网关时，如果 `model` 命中一个启用的元模型，专业版会先执行这段 DSL，把虚拟模型解析成一个真实上游模型，然后继续走普通网关流程。

这个语言只负责选择模型，不负责定价、鉴权、网络请求和内容处理。真实调用仍然由网关的渠道、模型、余额、密钥、限流和安全检查接管。

## 实现状态

当前实现可保存并执行：

| Action | 状态 | 说明 |
| --- | --- | --- |
| `call` | 可执行 | 直接解析到一个真实模型 |
| `route` | 可执行 | 按条件从上到下选择第一个匹配分支 |
| `switch` | 可执行 | 按权重或概率随机选择一个分支 |
| `parallel` | 预留 | 语法可解析，但保存校验会拒绝 |
| `judge` | 预留 | 语法可解析，但保存校验会拒绝 |

生产环境只应使用 `call`、`route` 和 `switch`。`parallel`、`judge` 保留给未来编排能力，当前不能保存为可运行元模型。

## 运行流程

1. 客户端请求 `/v1/*` 或 `/v1beta/*`，请求体里的 `model` 是元模型名。
2. 网关检查该元模型是否存在并启用。
3. API 密钥的模型白名单先按元模型名校验。
4. 专业版解析 DSL，并根据请求、用户、密钥上下文计算运行时变量。
5. DSL 返回一个真实模型名。
6. 网关把请求目标模型替换为真实模型，继续进行渠道选择。
7. 真实模型仍受用户渠道绑定、模型启用状态、余额、密钥额度、限流、SSRF 防护、敏感词过滤和用量记录约束。

::: tip
元模型不会创建独立的用户或渠道上下文。它只在普通网关路由之前做一次模型名解析。
:::

## 管理入口

前端管理页面在系统管理里的元模型区域提供 DSL 编辑器、模板和语法参考。保存前建议先点击校验，或者直接调用校验接口。

管理接口只在专业版注册，并且需要管理员登录态：

```http
GET    /api/meta-models
POST   /api/meta-models
PUT    /api/meta-models/:id
DELETE /api/meta-models/:id
POST   /api/meta-models/validate
```

创建和更新的请求体字段：

```json
{
  "name": "meta-smart",
  "description": "按上下文和概率选择模型",
  "dsl": "call \"gpt-4o-mini\"",
  "billing_mode": "actual",
  "input_price": "0",
  "output_price": "0",
  "cached_input_price": "0",
  "enabled": true
}
```

`POST /api/meta-models/validate` 使用相同字段，但不会写入数据库。成功时返回 `plan`，也就是解析后的 AST。创建和更新成功时返回 `meta_model` 和 `plan`。

## 计费模式

计费不是 DSL 的一部分，由元模型配置字段 `billing_mode` 控制。

| 模式 | 值 | 行为 |
| --- | --- | --- |
| 按真实模型计费 | `actual` | 使用最终选中的真实模型价格。元模型自身价格会被保存为 `0`。 |
| 按元模型计费 | `meta` | 使用元模型自身配置的输入、输出和缓存输入价格。上游调用仍然使用 DSL 选出的真实模型。 |

两种模式都会按当前用户和 API 密钥记录用量。`actual` 模式下日志模型名是实际模型；`meta` 模式下计费模型名是元模型名。

## 公开目录

公开模型目录会合并启用的元模型。元模型条目的关键字段：

| 字段 | 说明 |
| --- | --- |
| `model_name` | 元模型名 |
| `provider` | 固定为 `meta` |
| `provider_name` | 固定为 `Meta Module` |
| `is_meta_model` | 固定为 `true` |
| `meta_billing_mode` | `actual` 或 `meta` |
| `referenced_models` | DSL 引用到的真实模型目录条目 |

公开目录不会返回 DSL 源码。`referenced_models` 是完整的模型目录条目，且不会继续嵌套引用，便于前端展示价格和可用渠道。

## 语言结构

一个程序由零个或多个 `option` 声明，以及一个根 action 组成。

```text
option audit_label = "balanced-router"

route {
  when request.input_tokens <= 2000 => call "gpt-4o-mini"
  otherwise => call "gpt-4o"
}
```

当前 `option` 会进入 AST，但运行时尚未使用。建议只把它当作未来扩展或审计标签预留，不要依赖它改变执行结果。

### 注释和分隔符

行注释以 `#` 开头。`;` 和 `,` 在允许的位置是可选分隔符。

```text
# 优先处理图像请求
route {
  when request.has_image == true => call "gpt-4o";
  otherwise => call "gpt-4o-mini",
}
```

### 字面量

| 类型 | 写法 |
| --- | --- |
| string | 双引号字符串，支持 `\"`、`\\`、`\n`、`\r`、`\t` |
| number | 无符号十进制数，如 `2000`、`0.75`。不支持 `-1`、`+1`、`1_000` |
| bool | `true` 或 `false` |
| identifier | 首字符为字母或 `_`，后续可含字母、数字、`_`、`.` |

## Actions

### `call`

直接选择一个真实模型：

```text
call "gpt-4o-mini"
```

规则：

- 模型名必须存在于模型管理里的真实模型。
- 不能引用自己。
- 当前不能引用另一个元模型。

### `route`

按条件顺序选择第一个匹配分支：

```text
route {
  when request.has_audio == true => call "gpt-4o-audio"
  when request.has_image == true => call "gpt-4o"
  when request.input_tokens <= 2000 => call "gpt-4o-mini"
  otherwise => call "claude-sonnet-4"
}
```

规则：

- `when` 从上到下求值，第一个结果为 `true` 的分支胜出。
- `otherwise` 必须存在，且只能有一个。
- `otherwise` 后面不能再写 `when`。
- 分支里的 action 可以是 `call`、`route` 或 `switch`。

### `switch`

按权重随机选择分支：

```text
switch {
  weight 80 => call "gpt-4o-mini"
  weight 20 => call "gpt-4o"
}
```

`weight`、`chance`、`probability` 是等价关键字，数字含义相同。没有 `otherwise` 时，所有加权分支会按相对权重归一化。上面的例子就是 80% 对 20%。

使用小数概率时，可以用 `otherwise` 承接剩余概率：

```text
switch {
  chance 0.9 => call "gpt-4o-mini"
  otherwise => call "gpt-4o"
}
```

这表示 `gpt-4o-mini` 约 90%，`gpt-4o` 约 10%。只有当加权分支总和小于 `1` 时，`otherwise` 才会获得剩余概率。如果权重总和大于或等于 `1`，随机范围按总权重计算，`otherwise` 不会在常规情况下被抽中。

规则：

- 至少需要一个带权重分支。
- 权重必须是大于 `0` 的数字。
- `otherwise` 可选，且只能有一个。
- `otherwise` 后面不能再写带权重分支。
- 分支里的 action 可以继续嵌套 `call`、`route` 或 `switch`。

### `parallel` 预留

```text
parallel {
  call "gpt-4o"
  call "claude-sonnet-4"
} synthesize "gpt-4o-mini"
```

解析器能识别这个结构，但保存校验会返回 `parallel meta model execution is not implemented yet`。当前不要在生产配置里使用。

### `judge` 预留

```text
judge "gpt-4o-mini" {
  prompt "Return exactly one label: cheap, balanced, strong."

  route {
    when judge.output == "cheap" => call "gpt-4o-mini"
    when judge.output == "strong" => call "claude-sonnet-4"
    otherwise => call "gpt-4o"
  }
}
```

解析器能识别 judge 模型、可选 prompt 和内部 route，但保存校验会返回 `judge meta model execution is not implemented yet`。

## 表达式

表达式只能比较一个变量和一个字面量：

```text
request.input_tokens <= 2000
request.has_image == true
request.text contains "invoice"
request.last_user_message matches "(?i)reason|analyze"
```

支持的运算符：

| 运算符 | 类型 | 说明 |
| --- | --- | --- |
| `==` | string、number、bool | 同类型相等 |
| `!=` | string、number、bool | 同类型不相等 |
| `<` | number | 小于 |
| `<=` | number | 小于等于 |
| `>` | number | 大于 |
| `>=` | number | 大于等于 |
| `contains` | string | 左侧包含右侧 |
| `not_contains` | string | 左侧不包含右侧 |
| `starts_with` | string | 左侧以前缀开头 |
| `ends_with` | string | 左侧以后缀结尾 |
| `matches` | string | 左侧匹配右侧正则 |

类型规则：

- 数值比较要求两侧都是 number。
- 字符串运算要求两侧都是 string。
- 布尔值只能用 `==` 和 `!=`。
- 不支持算术、括号、`and`、`or`、`not`。
- `matches` 使用 Go 的正则语法，正则无效时运行会报错。

需要组合多个条件时，优先用多层 `route` 或按顺序拆成多个分支。

## 运行时变量

### 请求变量

| 变量 | 类型 | 说明 |
| --- | --- | --- |
| `request.input_tokens` | number | 用请求体估算的输入 token 数 |
| `request.max_output_tokens` | number | 从 `max_tokens`、`max_completion_tokens`、`maxOutputTokens` 读取的最大输出 token |
| `request.total_estimated_tokens` | number | 输入 token 加最大输出 token |
| `request.message_count` | number | `messages`、`contents` 或数组形式 `input` 的项目数量 |
| `request.text` | string | 从 `input`、`messages`、`contents`、`prompt`、`system` 汇总出的文本 |
| `request.last_user_message` | string | 最后一条 `role=user` 消息文本 |
| `request.system` | string | 顶层 `system`，或 `role=system/developer` 的系统提示文本 |
| `request.has_image` | bool | 请求体中是否出现 `image`、`image_url` 或 `images` |
| `request.has_audio` | bool | 请求体中是否出现 `audio`、`input_audio` 或 `audio_url` |
| `request.has_tools` | bool | 请求体中是否出现 `tools`、`tool_choice`、`function_call` 或 `functions` |
| `request.tool_count` | number | `tools` 或 `functions` 数组长度 |
| `request.stream` | bool | 顶层 `stream` 布尔值 |
| `request.temperature` | number | 顶层 `temperature` 数值 |

### 用户和密钥变量

| 变量 | 类型 | 说明 |
| --- | --- | --- |
| `user.balance` | number | 当前用户余额 |
| `user.id` | number | 当前用户 ID |
| `user.group` | string | 当前用户分组名 |
| `user.is_admin` | bool | 当前用户是否为管理员 |
| `api_key.name` | string | 当前 API 密钥名称 |
| `api_key.quota_limit` | number | 当前 API 密钥额度上限，没有上限时为 `0` |
| `api_key.quota_remaining` | number | 当前 API 密钥剩余额度，没有正数上限时为 `0` |

### 预留变量

| 变量 | 类型 | 当前值 |
| --- | --- | --- |
| `channel.name` | string | 渠道选择前固定为空字符串 |
| `judge.output` | string | 未来 `judge` action 使用，当前不可执行 |

## 完整示例

### 静态别名

```text
call "gpt-4o-mini"
```

适合把对外模型名和内部真实模型名解耦。

### 按上下文长度路由

```text
route {
  when request.total_estimated_tokens <= 4000 => call "gpt-4o-mini"
  when request.total_estimated_tokens <= 32000 => call "gpt-4o"
  otherwise => call "claude-sonnet-4"
}
```

### 多模态和工具调用路由

```text
route {
  when request.has_audio == true => call "gpt-4o-audio"
  when request.has_image == true => call "gpt-4o"
  when request.has_tools == true => call "gpt-4o"
  otherwise => call "gpt-4o-mini"
}
```

### 文本关键词和正则路由

```text
route {
  when request.last_user_message matches "(?i)code|debug|stack trace" => call "claude-sonnet-4"
  when request.text contains "invoice" => call "gpt-4o"
  when request.system starts_with "You are a translator" => call "gpt-4o-mini"
  otherwise => call "gpt-4o-mini"
}
```

### 概率 A/B 路由

```text
switch {
  weight 95 => call "gpt-4o-mini"
  weight 5 => call "gpt-4o"
}
```

适合灰度强模型、成本实验或新模型小流量验证。

### `route` 嵌套 `switch`

```text
route {
  when request.has_image == true => call "gpt-4o"
  when request.input_tokens > 32000 => call "claude-sonnet-4"
  otherwise => switch {
    weight 90 => call "gpt-4o-mini"
    weight 10 => call "gpt-4o"
  }
}
```

这类写法适合先处理硬约束，再对普通请求做概率分流。

### 额度和余额感知

```text
route {
  when api_key.quota_remaining < 0.5 => call "gpt-4o-mini"
  when user.balance < 1 => call "gpt-4o-mini"
  when user.group == "enterprise" => call "claude-sonnet-4"
  otherwise => call "gpt-4o"
}
```

### 管理员专用强模型

```text
route {
  when user.is_admin == true => call "claude-sonnet-4"
  otherwise => call "gpt-4o-mini"
}
```

### 小数概率和兜底

```text
switch {
  probability 0.70 => call "gpt-4o-mini"
  probability 0.20 => call "gpt-4o"
  otherwise => call "claude-sonnet-4"
}
```

这里前两个分支合计 `0.90`，`otherwise` 获得剩余约 `0.10`。

## 保存校验规则

管理接口保存或校验时会检查：

- DSL 非空。
- 语法完整，没有未闭合块、非法字符或非法字面量。
- 根节点必须是一个 action。
- 引用的模型必须存在。
- 引用的模型必须是真实模型，不能是另一个元模型。
- 元模型不能引用自己。
- `route` 必须有且只有一个 `otherwise`。
- `route` 的 `otherwise` 后不能再出现 `when`。
- `switch` 至少有一个带权重分支。
- `switch` 权重必须大于 `0`。
- `switch` 不能有重复 `otherwise`。
- `switch` 的 `otherwise` 后不能再出现带权重分支。
- `parallel` 和 `judge` 当前会被拒绝，因为运行时未实现。
- 价格不能为负数。
- `billing_mode` 只能是 `actual` 或 `meta`，空值会按 `actual` 处理。

常见错误：

| 输入或场景 | 错误 |
| --- | --- |
| 空 DSL | `DSL is required` |
| `route` 缺少 `otherwise` | `route requires an otherwise branch` |
| `route` 里 `otherwise` 后继续写 `when` | `when branch cannot follow otherwise` |
| `switch` 没有权重分支 | `switch requires at least one weighted branch` |
| `switch` 权重为 `0` | `switch weight must be a positive number` |
| `call "not-a-model"` | `Referenced model not found: not-a-model` |
| 元模型 `meta-smart` 内写 `call "meta-smart"` | `Meta model cannot reference itself` |
| 引用另一个元模型 | `Meta model cannot reference another meta model yet: ...` |
| 保存 `parallel` | `parallel meta model execution is not implemented yet` |
| 保存 `judge` | `judge meta model execution is not implemented yet` |

## 安全边界

DSL 不能读写文件、读取环境变量、访问网络、查询数据库、执行 shell、定义函数、定义循环或递归调用元模型。它只能读取内置运行时变量，并返回一个真实模型名。

API 密钥行为需要特别注意：

- 密钥的 `allowed_models` 先校验元模型名。
- 元模型解析到真实模型后，不会再次用该密钥的 `allowed_models` 校验真实模型名。
- 这样管理员可以只暴露一个受控的元模型名，而不直接暴露所有底层模型名。
- 真实模型仍必须能通过当前用户的渠道绑定、渠道启用状态、模型启用状态和余额额度检查。

## 推荐工作流

1. 先在模型管理中确认所有真实模型已经存在并启用。
2. 新建元模型名，例如 `meta-smart`。
3. 选择计费模式。默认使用 `actual` 更容易和真实模型成本对齐。
4. 编写 DSL，先用 `POST /api/meta-models/validate` 或前端校验按钮验证。
5. 保存并启用元模型。
6. 用普通 API 请求调用该元模型名，查看用量日志和真实上游表现。
7. 对概率路由做灰度时，先使用小比例权重，并持续观察成本和错误率。

## 形式文法

```text
program          = { option separator } action { separator } ;
option           = "option" identifier "=" literal ;
action           = call | route | switch | parallel | judge ;
call             = "call" string ;
route            = "route" "{" { when_branch separator } otherwise_branch { separator } "}" ;
when_branch      = "when" expression "=>" action ;
otherwise_branch = "otherwise" "=>" action ;
switch           = "switch" "{" { switch_branch separator } [ switch_otherwise separator ] "}" ;
switch_branch    = switch_weight number "=>" action ;
switch_weight    = "weight" | "chance" | "probability" ;
switch_otherwise = "otherwise" "=>" action ;
parallel         = "parallel" "{" call { separator call } { separator } "}" [ "synthesize" string ] ;
judge            = "judge" string "{" [ "prompt" string separator ] route { separator } "}" ;
expression       = identifier operator literal ;
operator         = "==" | "!=" | "<" | "<=" | ">" | ">="
                 | "contains" | "not_contains" | "starts_with" | "ends_with" | "matches" ;
literal          = string | number | boolean ;
boolean          = "true" | "false" ;
separator        = ";" | "," ;
```
