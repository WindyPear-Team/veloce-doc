# PUT `/api/users/:id`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `PUT` |
| 路径 | `/api/users/:id` |
| 鉴权 | 管理员 |

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

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `username` | Body | string | 是 | 用户名。 |
| `email` | Body | string | 是 | 邮箱地址。 |
| `balance` | Body | string/number | 否 | 请求字段。 |
| `group_ids` | Body | array | 否 | 分组 ID 列表。 |
| `is_admin` | Body | boolean | 否 | 是否管理员。 |
| `enabled` | Body | boolean | 否 | 是否启用。 |

## 返回值

更新后的用户。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 用户 ID。 |
| `username` | string | 用户名。 |
| `email` | string | 邮箱。 |
| `oidc_sub` | string/null | OIDC 用户标识。 |
| `email_verified` | boolean | 邮箱是否验证。 |
| `avatar_url` | string | 头像 URL。 |
| `balance` | string/number | 余额。 |
| `group_id` | number | 主用户组 ID。 |
| `group` | object | 主用户组。 |
| `groups` | array | 用户组成员关系，元素包含 id、user_id、group_id、group、expires_at、created_at、updated_at。 |
| `referral_code` | string/null | 邀请码。 |
| `referrer_id` | number/null | 邀请人 ID。 |
| `referrer` | object/null | 邀请人用户对象。 |
| `is_admin` | boolean | 是否管理员。 |
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

