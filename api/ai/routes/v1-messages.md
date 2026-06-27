# POST `/v1/messages`

Claude Messages 兼容接口。后端会读取 `model`，并可在上游不是 Claude 时做协议转换；未列出的 Claude 兼容字段会保留并转发。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/messages` |
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
| `key` | 否 | 可替代 Header。 |

## Body 参数

| 参数 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `model` | 是 | string | 平台模型名。 |
| `messages` | 是 | array | Claude 消息数组。 |
| `messages[].role` | 是 | string | `user` 或 `assistant`。 |
| `messages[].content` | 是 | string/array | 消息内容；协议转换和计费会读取。 |
| `system` | 否 | string/array | 系统提示。 |
| `max_tokens` | 否 | integer | 最大输出 token。 |
| `temperature` | 否 | number | 透传。 |
| `top_p` | 否 | number | 透传。 |
| `top_k` | 否 | integer | 透传。 |
| `stop_sequences` | 否 | array | 透传。 |
| `stream` | 否 | boolean | 是否流式。 |
| `tools` | 否 | array | 工具定义，透传或协议转换。 |
| `tool_choice` | 否 | object | 工具选择，透传。 |
| `metadata` | 否 | object | 透传。 |

未列出的 Claude Messages 兼容字段也会保留并转发。

## 返回值

Claude Messages 格式：

```json
{
  "id": "msg_xxx",
  "type": "message",
  "role": "assistant",
  "model": "claude-model",
  "content": [
    { "type": "text", "text": "Hello" }
  ],
  "usage": {
    "input_tokens": 1,
    "output_tokens": 1
  }
}
```
