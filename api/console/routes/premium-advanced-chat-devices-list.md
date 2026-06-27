# GET `/api/user/advanced-chat/devices`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/advanced-chat/devices` |
| 鉴权 | 登录用户高级版 |

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

连接器设备列表。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 设备 ID。 |
| `name` | string | 设备名称。 |
| `remark` | string | 备注。 |
| `hostname` | string | 主机名。 |
| `os` | string | 操作系统。 |
| `arch` | string | CPU 架构。 |
| `version` | string | 连接器版本。 |
| `status` | string | online 或 offline。 |
| `online` | boolean | 是否在线。 |
| `last_seen_at` | string/null | 最后心跳时间。 |
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

