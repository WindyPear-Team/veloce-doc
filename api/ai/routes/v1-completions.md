# POST `/v1/completions`

OpenAI legacy Completions 兼容接口。后端要求 `model`，其他兼容字段会转发给上游。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/completions` |
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
| `prompt` | 是 | string/array | 输入文本；后端计费文本会读取。 |
| `suffix` | 否 | string | 透传。 |
| `max_tokens` | 否 | integer | 透传。 |
| `temperature` | 否 | number | 透传。 |
| `top_p` | 否 | number | 透传。 |
| `n` | 否 | integer | 透传。 |
| `stream` | 否 | boolean | 是否流式。 |
| `logprobs` | 否 | integer | 透传。 |
| `echo` | 否 | boolean | 透传。 |
| `stop` | 否 | string/array | 透传。 |
| `presence_penalty` | 否 | number | 透传。 |
| `frequency_penalty` | 否 | number | 透传。 |
| `best_of` | 否 | integer | 透传。 |
| `logit_bias` | 否 | object | 透传。 |
| `user` | 否 | string | 透传。 |

未列出的 OpenAI Completions 兼容字段也会保留并转发。

## 返回值

OpenAI Completions 格式，或上游兼容响应：

```json
{
  "id": "cmpl_xxx",
  "object": "text_completion",
  "choices": [
    {
      "text": "Hello",
      "index": 0,
      "finish_reason": "stop"
    }
  ],
  "usage": {}
}
```
