# PUT `/api/user/advanced-chat/sessions/:id`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `PUT` |
| 路径 | `/api/user/advanced-chat/sessions/:id` |
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

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | Body | string | 是 | 标题。 |
| `messages` | Body | array | 是 | 消息数组。 |
| `model` | Body | string | 是 | 模型名。 |
| `agent_id` | Body | number | 否 | Agent ID。 |
| `skill_ids` | Body | array | 否 | Skill ID 列表。 |
| `metadata` | Body | object | 否 | 请求字段。 |

## 返回值

更新后的会话。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 会话 ID。 |
| `title` | string | 会话标题。 |
| `messages` | array | 消息数组。 |
| `messages[].id` | string | 消息 ID。 |
| `messages[].role` | string | user 或 assistant。 |
| `messages[].content` | string | 消息文本。 |
| `messages[].content_parts` | array | 分轮内容片段。 |
| `messages[].tool_calls` | array | 工具调用详情。 |
| `run_mode` | string | chat 或 assistant。 |
| `agent_id` | string | Agent ID。 |
| `skill_ids` | array | Skill ID 列表。 |
| `mcp_server_ids` | array | MCP 服务器 ID 列表。 |
| `connector_device_id` | string | 本地连接器设备 ID。 |
| `connector_workspace_path` | string | 连接器工作目录。 |
| `connector_auto_approve` | boolean | 连接器任务是否自动批准。 |
| `connector_command_prefixes` | array | 允许自动执行的命令前缀。 |
| `model_name` | string | 模型名。 |
| `user_channel_id` | number | 用户渠道 ID。 |
| `latest_run` | object/null | 最近一次 Assistant 任务。 |
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

