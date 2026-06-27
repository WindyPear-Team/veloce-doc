# POST `/api/user/advanced-chat/runs/:id/stop`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/user/advanced-chat/runs/:id/stop` |
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

停止成功响应。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | Run ID。 |
| `session_id` | string | 会话 ID。 |
| `assistant_message_id` | string | 助手消息 ID。 |
| `mode` | string | 运行模式。 |
| `status` | string | queued、running、completed、failed、cancelled。 |
| `status_message` | string | 状态说明。 |
| `current_round` | number | 当前工具/模型轮次。 |
| `error_message` | string | 错误信息。 |
| `cost` | string/number | 已产生费用。 |
| `tool_calls` | number | 工具调用次数。 |
| `tool_call_details` | array | 工具调用详情。 |
| `started_at` | string/null | 开始时间。 |
| `finished_at` | string/null | 结束时间。 |
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

