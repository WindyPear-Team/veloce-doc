# PUT `/api/user/advanced-chat/skills/:id`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `PUT` |
| 路径 | `/api/user/advanced-chat/skills/:id` |
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
| `name` | Body | string | 是 | 名称。 |
| `description` | Body | string | 否 | 描述。 |
| `prompt` | Body | string | 否 | 提示词。 |
| `content` | Body | string | 是 | 内容。 |
| `enabled` | Body | boolean | 否 | 是否启用。 |

## 返回值

更新后的 Skill。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | Skill ID。 |
| `user_id` | number | 所属用户 ID。 |
| `name` | string | Skill 名称。 |
| `description` | string | Skill 描述。 |
| `prompt` | string | 注入提示词。 |
| `mcp_server_ids` | array | 关联 MCP 服务器 ID 列表。 |
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

