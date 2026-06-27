# POST `/api/announcements`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/announcements` |
| 鉴权 | 管理员 |

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
| `title` | Body | string | 是 | 标题。 |
| `content` | Body | string | 是 | 内容。 |
| `enabled` | Body | boolean | 否 | 是否启用。 |
| `sort_order` | Body | number | 否 | 排序值。 |

## 返回值

新公告。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 公告 ID。 |
| `title` | string | 标题。 |
| `content` | string | 内容。 |
| `enabled` | boolean | 是否启用。 |
| `sort_order` | number | 排序值。 |
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

