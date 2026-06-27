# OpenAI Responses 接口

Responses 是 OpenAI 新版多模态接口入口，适合需要统一输入、工具调用、推理配置、结构化输出和流式响应的应用。

## 路由

| 路由 | 说明 |
| --- | --- |
| [POST /v1/responses](/api/ai/routes/v1-responses) | OpenAI Responses 兼容接口。 |

## 支持能力

| 能力 | 说明 |
| --- | --- |
| 多模态输入 | `input` 可按上游协议传入文本、数组或对象。 |
| 工具调用 | `tools`、`tool_choice`、`parallel_tool_calls` 等字段会透传或参与协议转换。 |
| 推理配置 | `reasoning`、`max_output_tokens`、`temperature` 等字段按上游支持透传。 |
| 流式输出 | `stream: true` 时返回 SSE。 |

## 相关接口

| 场景 | 文档 |
| --- | --- |
| 传统 OpenAI 对话 | [OpenAI Chat / Completions](/api/ai/openai-chat) |
| Claude 原生格式 | [Claude 接口](/api/ai/claude) |
| Gemini 原生格式 | [Gemini 接口](/api/ai/gemini) |
