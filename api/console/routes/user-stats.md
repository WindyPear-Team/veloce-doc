# GET `/api/user/stats`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/stats` |
| 鉴权 | 登录用户 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 否 | 无请求体时不需要。 |

## Path 参数

无。

## Query 参数

无。

## Body 参数

无。

## 返回值

当前用户统计。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `users` | number | 用户数。 |
| `channels` | number | 上级渠道数。 |
| `total_cost` | string/number | 累计费用。 |
| `today_requests` | number | 今日请求数。 |
| `balance` | string/number | 用户余额，用户统计接口返回。 |
| `group` | object | 用户组，用户统计接口返回。 |
| `total_requests` | number | 累计请求数，用户统计接口返回。 |
| `rpm` | number | 最近一分钟请求数。 |
| `tpm` | number | 最近一分钟 token 数。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

