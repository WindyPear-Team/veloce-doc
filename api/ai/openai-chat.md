# OpenAI Chat / Completions 接口

这一组接口面向 OpenAI 兼容客户端，是最常用的文本生成入口。`/v1/chat/completions` 适合对话、工具调用和流式输出；`/v1/completions` 主要用于兼容旧 SDK 或旧应用。

## 路由

| 路由 | 说明 |
| --- | --- |
| [POST /v1/chat/completions](/api/ai/routes/v1-chat-completions) | OpenAI Chat Completions 兼容接口。 |
| [POST /v1/completions](/api/ai/routes/v1-completions) | OpenAI legacy Completions 兼容接口。 |

## 选型建议

| 需求 | 建议 |
| --- | --- |
| 普通聊天应用 | 使用 `POST /v1/chat/completions`。 |
| OpenAI 兼容 SDK | 将 base URL 指向本项目网关，API Key 使用平台生成的 `sk-...`。 |
| 旧版 prompt 补全 | 仅在客户端不支持 Chat Completions 时使用 `POST /v1/completions`。 |
| 多模态和新工具链 | 优先查看 [OpenAI Responses 接口](/api/ai/responses)。 |
