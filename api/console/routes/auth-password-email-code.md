# POST `/auth/password/email-code`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/auth/password/email-code` |
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
| `email` | Body | string | 是 | 邮箱地址。 |
| `captcha_token` | Body | string | 否 | 验证码 token。 |

## 返回值

发送成功 message。

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

