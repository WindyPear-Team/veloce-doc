# Gemini 接口

Gemini 接口面向使用 Google Gemini 原生格式的客户端。`:modelAction` 会承载模型和动作信息，例如 `gemini-pro:generateContent` 或 `gemini-pro:streamGenerateContent`。

## 路由

| 路由 | 说明 |
| --- | --- |
| [POST /v1/models/:modelAction](/api/ai/routes/v1-models-model-action) | Gemini v1 兼容入口。 |
| [POST /v1beta/models/:modelAction](/api/ai/routes/v1beta-models-model-action) | Gemini v1beta 兼容入口。 |

## 常见动作

| 动作 | 说明 |
| --- | --- |
| `generateContent` | 非流式内容生成。 |
| `streamGenerateContent` | 流式内容生成。 |
| 其他 Gemini 动作 | 按路由文档和上游能力透传或转换。 |

## 相关接口

| 场景 | 文档 |
| --- | --- |
| OpenAI 兼容聊天 | [OpenAI Chat / Completions](/api/ai/openai-chat) |
| OpenAI Responses | [OpenAI Responses 接口](/api/ai/responses) |
