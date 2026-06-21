# Meta Model DSL

::: warning 专业版功能
Meta Model（元模型）语言（代码中称 Meta Module DSL）是**仅专业版**提供的领域特定语言，用于定义元模型的路由逻辑。社区版不包含该功能。
:::

元模型是一个对外暴露给用户和 API 密钥的**虚拟模型名**。当请求使用该虚拟模型名时，专业版解析器会执行这段语言，选出一个或多个真实上游模型，再把请求交回普通网关路径处理。

该语言只描述**选择与编排逻辑**，价格在服务端配置，不在语言里。

## 实现状态

当前专业版实现：

- **已解析**：`call`、`route`、`parallel`、`synthesize`、`judge`、`option`
- **已执行**：`call`，以及解析到 `call` 的 `route` 分支
- **尚未执行**：`parallel`、`synthesize`、`judge`

生产中请使用 `call` 与 `route`。其余形式作为预留语言特性被解析器接受（向前兼容），但运行时执行到它们时会返回错误。

## 心智模型

一个元模型有两部分：

1. **服务端配置**：名称、描述、启用状态、计费模式、可选的元模型价格；
2. **DSL 主体**：路由/编排逻辑，以及被 `call` / `judge` / `synthesize` 引用的真实模型名。

示例：

```text
route {
  when request.input_tokens <= 2000 => call "gpt-4o-mini"
  when request.input_tokens <= 16000 => call "gpt-4o"
  otherwise => call "claude-sonnet-4"
}
```

若进入的请求目标是 `meta-smart`，这段程序会把请求改写为 `gpt-4o-mini`、`gpt-4o` 或 `claude-sonnet-4` 之一。

## 运行时路径

1. 网关收到 `model` 为元模型名的请求；
2. 专业版解析器加载启用的元模型；
3. 校验当前 API 密钥是否被允许使用该元模型名；
4. 解析并求值 DSL；
5. 选中的真实模型替换请求中的 model；
6. 普通网关路由为该真实模型寻找渠道；
7. 真实模型仍使用该用户的密钥、余额、渠道绑定、分组倍率、渠道路由、安全检查与额度检查。

::: tip
元模型不创建独立的凭据或渠道上下文，它解析进的是与普通请求**相同**的 用户/密钥/渠道 管线。
:::

## 计费

计费不属于语言本身。服务支持两种计费模式：

- **按实际调用计费（actual）**：用实际选中并调用的真实模型计价；元模型的输入/输出/缓存价被忽略并存为 0；公开目录展示所涉真实模型及其价格，不展示 DSL 内容；
- **按元模型计费（meta）**：用元模型自身配置的输入/输出/缓存价计价；选中的真实模型仍决定上游渠道与实际调用；公开目录展示元模型价格并列出引用的真实模型。

两种模式下，网关都会按请求用户与密钥记录用量。元模型计费时日志模型名为元模型名；实际调用计费时为选中的真实模型名。

## 公开模型目录

模型目录可包含启用的元模型。对元模型：

- `is_meta_model` 为 `true`；
- `meta_billing_mode` 为 `actual` 或 `meta`；
- `referenced_models` 列出语言用到的真实模型；
- 不返回 DSL 源码。

## 专业版管理接口

```
GET    /api/meta-models
POST   /api/meta-models
PUT    /api/meta-models/:id
DELETE /api/meta-models/:id
POST   /api/meta-models/validate
```

校验接口会解析语言并检查引用的模型，但不会真正发起上游请求。

## 语言结构

一个程序由可选的 `option` 声明，后跟**恰好一个** action 组成。

```text
option max_calls = 3

route {
  when request.input_tokens <= 2000 => call "gpt-4o-mini"
  otherwise => call "gpt-4o"
}
```

可用 action：`call`、`route`、`parallel`、`judge`。生产可用：`call`、解析到 `call` 的 `route`。

### 注释与分隔符

行注释以 `#` 开头。`;` 和 `,` 在解析器接受的位置是可选分隔符。空白（除字符串内）不敏感。

### 字面量

- **字符串**：双引号，支持转义 `\"` `\\` `\n` `\r` `\t`；
- **数字**：无符号十进制（`2000`、`0.75` 合法；`-1`、`+1`、`1_000` 非法）；
- **布尔**：小写 `true` / `false`；
- **标识符**：首字符为字母，可含字母、数字、`_`、`.`（如 `request.input_tokens`）。

## Actions

### `call`

调用一个真实模型：

```text
call "gpt-4o-mini"
```

规则：模型名必须指向已存在的真实模型；元模型不能调用自身；当前实现不能引用另一个元模型。

### `route`

选择第一个匹配的分支：

```text
route {
  when request.input_tokens <= 2000 => call "gpt-4o-mini"
  when request.input_tokens <= 16000 => call "gpt-4o"
  otherwise => call "claude-sonnet-4"
}
```

规则：分支自上而下求值，第一个为真的 `when` 胜出；`otherwise` 必填、必须最后、且只能有一个。把窄而高优先的条件放前面。

### `parallel`（预留）

```text
parallel {
  call "gpt-4o"
  call "claude-sonnet-4"
} synthesize "gpt-4o-mini"
```

解析器接受，块内目前只接受 `call`，至少一个；`synthesize "model"` 可选。**运行时未实现**，执行到会报错。

### `judge`（预留）

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

解析器要求 judge 模型字符串与一个 `route` 块，`prompt` 可选。**运行时未实现**，执行到会报错。

## 表达式

表达式比较一个变量与一个字面量：

```text
request.input_tokens <= 2000
request.has_image == true
api_key.quota_remaining > 1.5
```

支持运算符：`==` `!=` `<` `<=` `>` `>=`。类型规则：`==`/`!=` 比较同类型；数值运算符要求两侧都是数字；布尔/字符串只能用 `==`/`!=`。**不支持算术**，需要总量时用 `request.total_estimated_tokens`。

## 运行时变量

### 请求变量

| 变量 | 类型 | 说明 |
| --- | --- | --- |
| `request.input_tokens` | number | 原始请求体的估算输入 token 数 |
| `request.max_output_tokens` | number | 请求的最大输出 token（识别 `max_tokens` / `max_completion_tokens` / `maxOutputTokens`） |
| `request.total_estimated_tokens` | number | 输入 + 最大输出 |
| `request.message_count` | number | 检测到的消息/内容/输入项数量 |
| `request.has_image` | boolean | 请求是否含图像输入 |
| `request.has_audio` | boolean | 请求是否含音频输入 |

### 用户与密钥变量

| 变量 | 类型 | 说明 |
| --- | --- | --- |
| `user.balance` | number | 当前用户余额 |
| `api_key.quota_remaining` | number | 当前密钥剩余额度；无正额度上限时为 `0` |

### 预留变量

- `channel.name`（string）：未来渠道感知路由预留，当前在渠道选择前初始化为空串；
- `judge.output`（string）：未来 `judge` 执行预留，仅在 judge route 内有意义。

## Options

```text
option max_calls = 3
option timeout_ms = 45000
option audit_label = "balanced-router"
```

当前实现：options 被解析并返回到 AST，但**运行时尚未使用**。未来建议：`max_calls`、`timeout_ms`、`allow_parallel`、`audit_label`，并在其可强制时拒绝未知/越界选项。

## 形式文法

```text
program          = { option separator } action { separator } ;
option           = "option" identifier "=" literal ;
action           = call | route | parallel | judge ;
call             = "call" string ;
route            = "route" "{" { when_branch separator } otherwise_branch { separator } "}" ;
when_branch      = "when" expression "=>" action ;
otherwise_branch = "otherwise" "=>" action ;
parallel         = "parallel" "{" call { separator call } { separator } "}" [ "synthesize" string ] ;
judge            = "judge" string "{" [ "prompt" string separator ] route { separator } "}" ;
expression       = identifier operator literal ;
operator         = "==" | "!=" | "<" | "<=" | ">" | ">=" ;
literal          = string | number | boolean ;
boolean          = "true" | "false" ;
separator        = ";" | "," ;
```

## 完整示例

### 静态别名

```text
call "gpt-4o-mini"
```

### 按 token 路由

```text
route {
  when request.input_tokens <= 2000 => call "gpt-4o-mini"
  when request.input_tokens <= 16000 => call "gpt-4o"
  otherwise => call "claude-sonnet-4"
}
```

### 多模态路由

```text
route {
  when request.has_audio == true => call "gpt-4o-audio"
  when request.has_image == true => call "gpt-4o"
  otherwise => call "gpt-4o-mini"
}
```

### 余额感知路由

```text
route {
  when user.balance < 1 => call "gpt-4o-mini"
  when request.input_tokens <= 8000 => call "gpt-4o"
  otherwise => call "claude-sonnet-4"
}
```

### 密钥额度路由

```text
route {
  when api_key.quota_remaining < 0.5 => call "gpt-4o-mini"
  otherwise => call "gpt-4o"
}
```

## 校验规则

解析器校验语法。专业版服务校验器还检查：

- DSL 主体非空；
- 引用的模型存在；
- 引用的是真实模型而非元模型；
- 元模型不能引用自身；
- `route` 恰好一个 `otherwise`；
- `otherwise` 不在 `when` 之前；
- 价格非负；
- 计费模式合法。

## 安全模型

该语言**不能**：读写文件、访问环境变量、直接发起网络请求、查询数据库、执行 shell、定义循环、定义用户函数、递归调用元模型。

所有真实供应商调用仍走完整网关管线：认证、密钥限制、用户渠道绑定、渠道可用性、出站 URL 防护、敏感内容过滤、余额检查、密钥额度检查、用量记录。

## 密钥与渠道行为

- 密钥的模型限制**先**按元模型名校验；
- 元模型解析到真实模型后，渠道选择仍使用当前密钥的用户渠道绑定——绑定到某用户渠道的密钥不会让元模型选到绑定之外的渠道；
- 解析出的真实模型，当密钥已被允许使用该元模型时，**不会**再次校验其 `allowed_models`。这让管理员可以暴露一个受控的元模型，而不必直接暴露每个底层模型名。

## 错误示例

| 输入 | 错误 |
| --- | --- |
| `route` 缺 `otherwise` | `route requires an otherwise branch` |
| `call "not-a-real-model"` | `Referenced model not found: not-a-real-model` |
| 元模型 `meta-smart` 内 `call "meta-smart"` | `Meta model cannot reference itself` |
| 执行到 `parallel` | `parallel meta model execution is not implemented yet` |

## 推荐编写流程

1. 先创建/确认元模型将引用的真实模型；
2. 创建元模型名（如 `meta-smart`）；
3. 选择计费模式；
4. 编写并用 `POST /api/meta-models/validate` 校验 DSL；
5. 启用后用真实请求验证路由是否符合预期。
