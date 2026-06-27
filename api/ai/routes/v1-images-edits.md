# POST `/v1/images/edits`

OpenAI 风格图片编辑接口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/images/edits` |
| 鉴权 | API Key 或登录 JWT |
| Content-Type | `multipart/form-data` |

## Header 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer sk-...` 或 `Bearer <jwt>`。 |
| `x-api-key` | 否 | 可替代 `Authorization`。 |
| `Content-Type` | 是 | `multipart/form-data`，由客户端带 boundary。 |

## Query 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `key` | 否 | 可替代 Header。 |

## Form 参数

| 参数 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `model` | 是 | string | 平台图片编辑模型名。 |
| `image` | 是 | file/file[] | 输入图片文件。后端会转发所有 `image` 文件。 |
| `prompt` | 是 | string | 编辑提示词；后端敏感词和计费会读取。 |
| `mask` | 否 | file | 遮罩图片。 |
| `n` | 否 | integer | 输出数量。 |
| `size` | 否 | string | 输出尺寸。 |
| `response_format` | 否 | string | `url` 或 `b64_json`。 |
| `user` | 否 | string | 透传给上游。 |

未列出的表单字段也会保留并转发。

## 返回值

OpenAI 图片编辑响应：

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
