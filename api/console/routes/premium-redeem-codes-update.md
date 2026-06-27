# PUT `/api/redeem-codes/:id`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `PUT` |
| 路径 | `/api/redeem-codes/:id` |
| 鉴权 | 管理员高级版 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 是 | `application/json`。 |

## Path 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | Path | string | 是 | 路径参数 `id`。 |

## Query 参数

无。

## Body 参数

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | string | 兑换码；创建时可留空自动生成。 |
| `amount` | string/number | 余额奖励。与 group_id、subscription_plan_id 三者至少一个有效。 |
| `group_id` | number/null | 授予的用户组 ID。 |
| `group_duration_days` | number | 用户组有效天数，0 表示永久。 |
| `subscription_plan_id` | number/null | 授予的订阅套餐 ID。 |
| `subscription_duration_days` | number | 订阅有效天数，0 表示永久。 |
| `allow_stacking` | boolean | 是否允许权益叠加有效期。 |
| `max_uses` | number | 最大使用次数，0 表示不限。 |
| `enabled` | boolean | 是否启用。 |
| `expires_at` | string | 过期时间，RFC3339/ISO 字符串；空字符串表示不过期。 |

## 返回值

更新后的兑换码。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 兑换码 ID。 |
| `code` | string | 兑换码。 |
| `amount` | string/number | 兑换后直接增加的余额，可为 0。 |
| `group_id` | number/null | 授予的用户组 ID。 |
| `group` | object | 用户组对象。 |
| `group_duration_days` | number | 用户组有效天数，0 表示永久。 |
| `subscription_plan_id` | number/null | 授予的订阅套餐 ID。 |
| `subscription_plan` | object/null | 订阅套餐对象。 |
| `subscription_duration_days` | number | 订阅有效天数，0 表示永久。 |
| `allow_stacking` | boolean | 同组或同套餐权益是否叠加有效期。 |
| `max_uses` | number | 最大可用次数，0 表示不限。 |
| `used_count` | number | 已使用次数。 |
| `enabled` | boolean | 是否启用。 |
| `expires_at` | string/null | 兑换码过期时间。 |
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

