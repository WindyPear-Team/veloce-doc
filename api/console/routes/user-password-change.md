# POST `/api/user/password/change`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/user/password/change` |
| 鉴权 | 登录用户 |

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

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `current_password` | Body | string | 否 | 当前密码。 |
| `email_code` | Body | string | 否 | 邮箱验证码。 |
| `new_password` | Body | string | 是 | 新密码。 |

## 返回值

修改成功响应。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `m` | e | s |
| `s` | t | r |
| `操` | 作 | 结 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

