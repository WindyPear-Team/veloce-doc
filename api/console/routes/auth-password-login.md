# POST `/auth/password/login`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/auth/password/login` |
| 鉴权 | 公开 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 否 | 公开接口无需鉴权。 |
| `Content-Type` | Header | string | 是 | `application/json`。 |

## Path 参数

无。

## Query 参数

无。

## Body 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `identifier` | Body | string | 是 | 用户名或邮箱。 |
| `password` | Body | string | 是 | 密码。 |
| `captcha_token` | Body | string | 否 | 验证码 token。 |
| `agreement_accepted` | Body | boolean | 否 | 是否同意用户协议。 |

## 返回值

JWT token 和 user。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `token` | string | 登录成功后用于控制台请求的 JWT。 |
| `user` | object | 当前用户对象。 |
| `user.id` | number | 用户 ID。 |
| `user.username` | string | 用户名。 |
| `user.email` | string | 邮箱。 |
| `user.email_verified` | boolean | 邮箱是否已验证。 |
| `user.avatar_url` | string | 头像 URL。 |
| `user.balance` | string/number | 账户余额。 |
| `user.group_id` | number | 主用户组 ID。 |
| `user.group` | object | 主用户组对象。 |
| `user.groups` | array | 附加用户组成员关系。 |
| `user.referral_code` | string/null | 邀请码。 |
| `user.referrer_id` | number/null | 邀请人 ID。 |
| `user.is_admin` | boolean | 是否管理员。 |
| `user.created_at` | string | 创建时间。 |
| `user.updated_at` | string | 更新时间。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

