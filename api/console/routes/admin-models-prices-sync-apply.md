# POST `/api/models/prices/sync/apply`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/models/prices/sync/apply` |
| 鉴权 | 管理员 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 是 | `application/json`。 |

## Path 参数

无。

## Query 参数

无。

## Body 参数

价格预览项列表。

## 返回值

应用结果。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `results` | array | 同步结果数组。 |
| `results[].channel_id` | number | 上级渠道 ID。 |
| `results[].channel_name` | string | 上级渠道名称。 |
| `results[].source` | string | 同步来源。 |
| `results[].created` | number | 新增数量。 |
| `results[].updated` | number | 更新数量。 |
| `results[].error` | string | 该渠道同步错误。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

