# POST `/v1/images/generations`

OpenAI 风格图片生成接口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/images/generations` |
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
| `model` | 是 | string | 平台图片模型名。 |
| `prompt` | 是 | string | 图片提示词；后端敏感词和计费会读取。 |
| `n` | 否 | integer | 输出数量；后端估算图片数量会读取。 |
| `size` | 否 | string | 图片尺寸，透传给上游。 |
| `quality` | 否 | string | 图片质量，透传给上游。 |
| `style` | 否 | string | 透传给上游。 |
| `response_format` | 否 | string | `url` 或 `b64_json`，按上游支持透传。 |
| `user` | 否 | string | 透传给上游。 |
| `background` | 否 | string | 透传给上游。 |
| `moderation` | 否 | string | 透传给上游。 |
| `output_format` | 否 | string | 透传给上游。 |
| `output_compression` | 否 | integer | 透传给上游。 |

未列出的上游兼容字段也会保留并转发。

## 返回值

OpenAI 图片响应：

```json
{
  "created": 1760000000,
  "data": [
    {
      "url": "https://example.com/image.png",
      "b64_json": ""
    }
  ],
  "usage": {}
}
```

后端会优先读取返回中的 `usage`，否则按返回图片数量估算计费。
