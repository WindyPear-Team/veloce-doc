# POST `/api/user/advanced-chat/completions`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/user/advanced-chat/completions` |
| 鉴权 | 登录用户高级版 |

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

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `session_id` | string | 会话 ID；为空时可创建新会话。 |
| `title` | string | 会话标题。 |
| `model` | string | 模型名，必填。 |
| `user_channel_id` | number | 指定用户渠道 ID。 |
| `messages` | array | 消息数组，必填。 |
| `messages[].id` | string | 消息 ID。 |
| `messages[].role` | string | user 或 assistant。 |
| `messages[].content` | string | 消息文本。 |
| `messages[].content_parts` | array | 分轮内容片段。 |
| `messages[].tool_calls` | array | 历史工具调用。 |
| `mode` | string | chat 或 assistant。 |
| `agent_id` | string | Agent ID。 |
| `skill_ids` | array | Skill ID 列表。 |
| `mcp_server_ids` | array | MCP 服务器 ID 列表。 |
| `connector_device_id` | string | 本地连接器设备 ID。 |
| `connector_workspace_path` | string | 本地连接器工作目录。 |
| `connector_auto_approve` | boolean | 是否自动批准连接器任务。 |
| `connector_command_prefixes` | array | 可自动批准的命令前缀。 |
| `max_tokens` | number | 最大输出 token。 |
| `temperature` | number | 采样温度。 |
| `stream` | boolean | 是否使用 SSE。 |

## 返回值

运行结果、运行 ID 或 SSE。

## 返回字段

普通 `chat` 模式、`stream=false` 时返回一次性结果：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `message` | object | Assistant 消息对象。 |
| `message.id` | string | 持久化后的消息 ID。 |
| `message.role` | string | 固定为 `assistant`。 |
| `message.content` | string | 回复文本。 |
| `message.content_parts` | array | 按轮次保存的内容片段。 |
| `cost` | string/number | 本次调用产生的费用。 |
| `tool_calls` | number | 工具调用次数。 |
| `tool_call_details` | array | 工具调用详情。 |
| `tool_call_details[].id` | string | 工具调用 ID。 |
| `tool_call_details[].round` | number | 工具调用轮次。 |
| `tool_call_details[].name` | string | 平台转发给模型的工具名。 |
| `tool_call_details[].server` | string | MCP 服务器名称。 |
| `tool_call_details[].tool` | string | MCP 原始工具名。 |
| `tool_call_details[].status` | string | `running`、`ok`、`error`、`missing`、`invalid_arguments`。 |
| `tool_call_details[].arguments` | object | 工具参数。 |
| `tool_call_details[].result` | string | 工具返回摘要。 |

普通 `chat` 模式、`stream=true` 时返回 `text/event-stream`，事件包括：

| 事件 | data 字段 | 说明 |
| --- | --- | --- |
| `status` | `message`、`round`、`mode` | 流式状态，例如 `stream_started`、`loading_tools`、`model_round`。 |
| `text` | `delta`、`round` | 文本增量。 |
| `tool_call` | 同 `tool_call_details[]` | 工具调用开始或完成。 |
| `done` | 同普通非流式返回 | 最终结果。 |
| `error` | `error` | 错误信息。 |

`mode=assistant` 时创建异步任务并返回 HTTP `202`：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `session` | object | 会话对象，字段同助理聊天 Session。 |
| `run` | object | Run 对象。 |
| `run.id` | string | Run ID，可用于查询状态。 |
| `run.session_id` | string | 会话 ID。 |
| `run.assistant_message_id` | string | 助手消息 ID。 |
| `run.mode` | string | 固定为 `assistant`。 |
| `run.status` | string | `queued`、`running`、`completed`、`failed`、`cancelled`。 |
| `run.status_message` | string | 当前状态说明。 |
| `run.current_round` | number | 当前轮次。 |
| `run.error_message` | string | 错误信息。 |
| `run.cost` | string/number | 已产生费用。 |
| `run.tool_calls` | number | 工具调用次数。 |
| `run.tool_call_details` | array | 工具调用详情。 |
| `run.started_at` | string/null | 开始时间。 |
| `run.finished_at` | string/null | 结束时间。 |
| `run.created_at` | string | 创建时间。 |
| `run.updated_at` | string | 更新时间。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |


