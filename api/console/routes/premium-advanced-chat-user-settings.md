# GET `/api/user/advanced-chat/settings`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/advanced-chat/settings` |
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

用户助理聊天设置。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `attachment_max_mb` | number | 助理聊天附件大小上限，1 到 100。 |
| `attachment_allowed_types` | array | 允许上传的 MIME 类型。 |
| `builtin_mcp_servers` | array | 管理员内置 MCP 服务器数组。 |
| `mcp_servers` | array | 用户可用 MCP 服务器数组，用户设置接口返回。 |
| `custom_mcp_servers` | array | 用户自定义 MCP 服务器数组，用户设置接口返回。 |
| `assistant_mode_enabled` | boolean | 是否启用 Assistant 任务模式。 |
| `assistant_mcp_tools_enabled` | boolean | Assistant 是否允许 MCP 工具。 |
| `assistant_connector_list_files_enabled` | boolean | 是否允许本地连接器列文件。 |
| `assistant_connector_read_file_enabled` | boolean | 是否允许读文件。 |
| `assistant_connector_write_file_enabled` | boolean | 是否允许写文件。 |
| `assistant_connector_replace_text_enabled` | boolean | 是否允许文本替换。 |
| `assistant_connector_run_command_enabled` | boolean | 是否允许命令执行。 |
| `mcp_servers[].id` | string | MCP 服务器 ID。 |
| `mcp_servers[].name` | string | MCP 服务器名称。 |
| `mcp_servers[].url` | string | MCP 服务器 URL。 |
| `mcp_servers[].headers` | string | 请求头 JSON 或文本。 |
| `mcp_servers[].enabled` | boolean | 是否启用。 |
| `mcp_servers[].request_mode` | string | 请求模式：backend 或 frontend。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

