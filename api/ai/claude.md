# Claude 接口

Claude 接口面向使用 Anthropic Messages 协议的客户端。网关会读取 `model`、`messages`、`system`、`max_tokens`、`stream` 等关键字段，并在需要时做协议转换。

## 路由

| 路由 | 说明 |
| --- | --- |
| [POST /v1/messages](/api/ai/routes/v1-messages) | Claude Messages 兼容接口。 |

## 支持字段概览

| 字段 | 说明 |
| --- | --- |
| `model` | 平台模型名。 |
| `messages` | Claude 消息数组，支持文本和多模态内容结构。 |
| `system` | 系统提示。 |
| `max_tokens` | 最大输出 token。 |
| `stream` | 是否返回流式响应。 |
| `tools` / `tool_choice` | 工具定义和工具选择，按上游支持透传或转换。 |

## 相关接口

| 场景 | 文档 |
| --- | --- |
| OpenAI 兼容聊天 | [OpenAI Chat / Completions](/api/ai/openai-chat) |
| OpenAI Responses | [OpenAI Responses 接口](/api/ai/responses) |
