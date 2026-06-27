# GET `/v1/models`

列出当前凭据可访问的模型。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/v1/models` |
| 鉴权 | API Key 或登录 JWT |

## Header 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer sk-...` 或 `Bearer <jwt>`。 |
| `x-api-key` | 否 | 可替代 `Authorization`，值为 `sk-...`。 |

## Query 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `key` | 否 | 可替代 Header，值为 `sk-...`。 |

## 请求体

无。

## 返回值

```json
{
  "object": "list",
  "data": [
    {
      "id": "gpt-4o",
      "object": "model",
      "created": 0,
      "owned_by": "flai"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `object` | string | 固定为 `list`。 |
| `data` | array | 可用模型列表。 |
| `data[].id` | string | 平台对外模型名。 |
| `data[].object` | string | 固定为 `model`。 |
| `data[].created` | integer | 当前实现返回 `0`。 |
| `data[].owned_by` | string | 当前实现返回 `flai`。 |
