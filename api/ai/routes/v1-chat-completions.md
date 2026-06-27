# POST `/v1/chat/completions`

OpenAI Chat Completions 兼容接口。后端会读取模型名、消息、流式标记和用量字段；其他 OpenAI 兼容字段会随请求透传给上游。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/chat/completions` |
| 鉴权 | API Key 或登录 JWT |
| Content-Type | `application/json` |

## Header 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer sk-...` 或 `Bearer <jwt>`。 |
| `x-api-key` | 否 | 可替代 `Authorization`。 |
| `Content-Type` | 是 | `application/json`。 |

## Query 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `key` | 否 | 可替代 Header，值为 `sk-...`。 |

## Body 参数

| 参数 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `model` | 是 | string | 平台模型名。 |
| `messages` | 是 | array | OpenAI 消息数组。 |
| `messages[].role` | 是 | string | `system`、`user`、`assistant`、`tool` 等。 |
| `messages[].content` | 是 | string/array/object/null | 消息内容；后端计费文本会从该字段抽取。 |
| `messages[].name` | 否 | string | OpenAI 兼容字段，透传。 |
| `messages[].tool_calls` | 否 | array | 工具调用，透传或协议转换。 |
| `messages[].tool_call_id` | 否 | string | 工具消息关联 ID。 |
| `stream` | 否 | boolean | 是否返回 SSE。 |
| `temperature` | 否 | number | 透传给上游。 |
| `top_p` | 否 | number | 透传给上游。 |
| `n` | 否 | integer | 透传给上游。 |
| `stop` | 否 | string/array | 透传给上游。 |
| `max_tokens` | 否 | integer | 后端协议转换会读取；透传。 |
| `max_completion_tokens` | 否 | integer | 后端协议转换会读取；透传。 |
| `presence_penalty` | 否 | number | 透传给上游。 |
| `frequency_penalty` | 否 | number | 透传给上游。 |
| `logit_bias` | 否 | object | 透传给上游。 |
| `user` | 否 | string | 透传给上游。 |
| `tools` | 否 | array | 工具定义，透传或协议转换。 |
| `tool_choice` | 否 | string/object | 工具选择，透传。 |
| `response_format` | 否 | object | 响应格式，透传。 |
| `seed` | 否 | integer | 透传给上游。 |
| `stream_options` | 否 | object | 透传；OpenAI 上游可用 `include_usage`。 |

未列出的 OpenAI 兼容字段也会保留在请求体中转发。

## 返回值

非流式返回 OpenAI Chat Completions 格式：

```json
{
  "id": "chatcmpl_xxx",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 1,
    "completion_tokens": 1,
    "total_tokens": 2
  }
}
```

流式返回 `text/event-stream`。
