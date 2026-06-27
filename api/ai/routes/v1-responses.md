# POST `/v1/responses`

OpenAI Responses 兼容接口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/responses` |
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
| `input` | 是 | string/array/object | Responses 输入；后端协议转换会读取。 |
| `instructions` | 否 | string | 透传。 |
| `stream` | 否 | boolean | 是否流式。 |
| `temperature` | 否 | number | 透传。 |
| `top_p` | 否 | number | 透传。 |
| `max_output_tokens` | 否 | integer | 透传。 |
| `tools` | 否 | array | 透传或协议转换。 |
| `tool_choice` | 否 | string/object | 透传。 |
| `text` | 否 | object | 透传。 |
| `reasoning` | 否 | object | 透传。 |
| `metadata` | 否 | object | 透传。 |
| `parallel_tool_calls` | 否 | boolean | 透传。 |
| `previous_response_id` | 否 | string | 透传。 |
| `store` | 否 | boolean | 透传。 |
| `truncation` | 否 | string | 透传。 |
| `user` | 否 | string | 透传。 |

未列出的 OpenAI Responses 兼容字段也会保留并转发。

## 返回值

OpenAI Responses 格式：

```json
{
  "id": "resp_xxx",
  "object": "response",
  "model": "gpt-4o",
  "output": [],
  "usage": {
    "input_tokens": 1,
    "output_tokens": 1,
    "total_tokens": 2
  }
}
```
