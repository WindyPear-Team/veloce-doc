# POST `/api/subscription-plans`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/subscription-plans` |
| 鉴权 | 管理员高级版 |

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

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 套餐名称。 |
| `reset_amount` | string/number | 每个周期重置到的额度，必须大于 0。 |
| `reset_interval_days` | number | 重置周期天数，必须大于 0。 |
| `enabled` | boolean | 是否启用；创建时默认 true。 |

## 返回值

新订阅套餐。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 订阅套餐 ID。 |
| `name` | string | 套餐名称。 |
| `reset_amount` | string/number | 每个周期重置到的额度。 |
| `reset_interval_days` | number | 重置周期天数，必须大于 0。 |
| `enabled` | boolean | 是否启用。 |
| `created_at` | string | 创建时间。 |
| `updated_at` | string | 更新时间。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

