# POST `/api/user/advanced-chat/devices/:id/token`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/user/advanced-chat/devices/:id/token` |
| 鉴权 | 登录用户高级版 |

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

无。

## 返回值

轮换后的设备 token。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `token` | string | 连接器设备令牌，仅创建或轮换后返回一次。 |
| `device` | object | 设备对象，字段同设备列表。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

