# POST `/api/status-monitors/:id/check`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/status-monitors/:id/check` |
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

无。

## 返回值

检查结果。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 监控项 ID。 |
| `name` | string | 名称。 |
| `target_url` | string | 监控目标 URL。 |
| `check_type` | string | 检查类型。 |
| `method` | string | HTTP 方法。 |
| `interval_seconds` | number | 检查间隔秒数。 |
| `retention_hours` | number | 记录保留小时数。 |
| `enabled` | boolean | 是否启用。 |
| `last_status` | string | 最近状态。 |
| `last_checked_at` | string/null | 最近检查时间。 |
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

