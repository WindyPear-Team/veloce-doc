# 核心概念

理解下面这几个概念，能帮助你更快上手平台的使用和管理。它们贯穿用户文档、管理员文档与开发文档。

## 用户（User）

平台的账户主体，拥有：

- **余额（Balance）**：以平台货币计价（默认显示为 `$`），调用 API 会从余额扣费；
- **分组（Group）**：决定计费倍率，可同时属于多个分组；
- **邀请码 / 邀请人**：用于邀请返佣；
- **管理员标记（is_admin）**：管理员可访问后台管理接口。

## API 密钥（API Key）

用户在网关认证时使用的凭据，以 `sk-` 开头。一个用户可创建多个密钥，每个密钥可独立配置：

- **允许的模型**（AllowedModels）：限制此密钥只能调用部分模型；
- **允许的用户渠道**（AllowedUserChannels）：限制此密钥走哪些用户渠道；
- **允许的 IP**（AllowedIPs）：限制调用来源 IP；
- **额度上限**（QuotaLimit）：此密钥可消费的累计额度上限；
- **启用状态**。

详见 [管理 API 密钥](/guide/api-keys)。

## 模型（Model）

一个**全局模型身份**，例如 `gpt-4o`、`claude-sonnet-4`。模型本身不绑定任何上游渠道，它定义的是：

- 对用户暴露的模型名；
- 各分项价格（输入 / 输出 / 缓存输入 / 缓存写入 / 图像 / 音频，单位为每百万 token）与阶梯价；
- 供应商标识与图标。

## 渠道（Channel）

一个**上游供应商接入点**，例如某个 OpenAI 兼容服务或 Claude 服务。渠道包含：

- 类型（`openai` / `claude`）、`BaseURL`、上游 `APIKey`；
- 优先级（Priority）、权重（Weight）、倍率（Multiplier）、启用状态；
- 所属的**用户渠道**。

## 模型配置（ModelConfig）

模型与渠道之间的**多对多绑定**。它表示「某个渠道用什么上游模型名提供某个全局模型」。例如全局模型 `gpt-4o` 在渠道 A 上对应上游名 `gpt-4o-2024-08-06`。一个全局模型可由多个渠道提供，网关据此做路由。

```
Model(全局模型)  ──< ModelConfig >──  Channel(上游渠道)
   gpt-4o                              渠道A: 上游名 gpt-4o-2024-08-06
                                       渠道B: 上游名 gpt-4o
```

## 用户渠道（UserChannel）

一组渠道的**逻辑分层**，对用户可见。它有自己的倍率和路由算法（`priority` / `weight` / 轮询），下面挂载多个具体渠道。用户渠道用于把不同质量/价格的供给分开售卖。

## 分组与倍率（Group & Multiplier）

最终费用由多个倍率相乘得到：

```
费用 = 基础 token 费用 × 分组倍率 × 渠道倍率
```

- **分组倍率**：按用户所属分组，可在「分组级」「渠道-分组级」「模型配置-分组级」配置；用户属于多个分组时，按系统设置 `group_multiplier_mode`（默认取最小值 `min`）合并；
- **渠道倍率 / 用户渠道倍率**：按渠道或用户渠道配置。

详见 [分组与倍率](/admin/groups-and-multipliers) 与 [计费体系](/admin/billing)。

## 网关协议

网关同时对外暴露三套兼容协议，并在内部按需转换为上游协议：

| 客户端协议 | 入口路径 |
| --- | --- |
| OpenAI | `/v1/chat/completions`、`/v1/completions`、`/v1/responses`、`/v1/images/generations` |
| Claude（Anthropic Messages） | `/v1/messages` |
| Gemini | `/v1beta/models/:modelAction`、`/v1/models/:modelAction` |

详见 [兼容协议](/guide/protocols)。

## 计费与日志

每次成功请求都会生成一条 **TokenLog**，记录用户、密钥、渠道、模型、各类 token 数量与最终费用。用户可在「用量」页查看自己的记录，管理员可在后台查看全平台日志与统计。

## Meta Model（专业版）

专业版引入了**元模型**：一个虚拟模型名，请求命中后由一段 DSL 在运行时动态选择真实模型。社区版不含该功能，详见 [Meta Model DSL](/develop/meta-model-dsl)。
