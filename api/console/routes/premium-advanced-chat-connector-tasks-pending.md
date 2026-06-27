# GET `/api/user/advanced-chat/runs/:id/connector-tasks/pending`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/advanced-chat/runs/:id/connector-tasks/pending` |
| 鉴权 | 登录用户高级版 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 否 | 无请求体时不需要。 |

## Path 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | Path | string | 是 | 路径参数 `id`。 |

## Query 参数

无。

## Body 参数

无。

## 返回值

待审批连接器任务。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 任务 ID。 |
| `device_id` | string | 设备 ID。 |
| `device_name` | string | 设备名称，审批列表返回。 |
| `run_id` | string | Run ID。 |
| `action` | string | 动作名。 |
| `workspace_path` | string | 工作目录。 |
| `payload` | object | 任务载荷。 |
| `created_at` | string | 创建时间。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

