# POST `/api/user/advanced-chat/agents`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/user/advanced-chat/agents` |
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

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | Body | string | 是 | 名称。 |
| `description` | Body | string | 否 | 描述。 |
| `system_prompt` | Body | string | 否 | 系统提示词。 |
| `model` | Body | string | 是 | 模型名。 |
| `tools` | Body | array | 否 | 请求字段。 |
| `mcp_servers` | Body | array | 否 | MCP 服务器列表。 |
| `enabled` | Body | boolean | 否 | 是否启用。 |

## 返回值

新 Agent。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | Agent ID。 |
| `user_id` | number | 所属用户 ID。 |
| `name` | string | Agent 名称。 |
| `prompt` | string | 系统提示词。 |
| `default_model` | string | 默认模型名。 |
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

