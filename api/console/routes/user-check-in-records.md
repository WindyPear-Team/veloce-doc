# GET `/api/user/check-in/records`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/check-in/records` |
| 鉴权 | 登录用户 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 否 | 无请求体时不需要。 |

## Path 参数

无。

## Query 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | Query | number | 否 | 请求字段。 |
| `page_size` | Query | number | 否 | 请求字段。 |
| `from` | Query | string | 否 | 请求字段。 |
| `to` | Query | string | 否 | 请求字段。 |

## Body 参数

无。

## 返回值

签到记录数组或分页对象。

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

