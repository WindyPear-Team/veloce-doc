# 高级版控制台接口

## 订阅套餐管理

### GET `/api/subscription-plans`

返回订阅套餐列表。

### POST `/api/subscription-plans`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 套餐名称。 |
| `description` | string | 否 | 描述。 |
| `amount` | string/number | 否 | 套餐额度。 |
| `reset_amount` | string/number | 否 | 周期重置额度。 |
| `reset_interval_days` | number | 否 | 重置周期天数。 |
| `active_days` | number | 否 | 有效天数。 |
| `enabled` | boolean | 否 | 是否启用。 |

### PUT `/api/subscription-plans/:id`

Path：`id` 为套餐 ID。Body 同创建接口。

### DELETE `/api/subscription-plans/:id`

删除订阅套餐。

## 兑换码管理

### GET `/api/redeem-codes`

返回兑换码列表。

### POST `/api/redeem-codes`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `code` | string | 是 | 兑换码。 |
| `amount` | string/number | 否 | 兑换余额。 |
| `group_id` | number | 否 | 兑换后加入分组。 |
| `subscription_plan_id` | number | 否 | 兑换订阅套餐。 |
| `subscription_duration_days` | number | 否 | 订阅有效天数。 |
| `max_uses` | number | 否 | 最大使用次数。 |
| `expires_at` | string | 否 | 过期时间。 |
| `enabled` | boolean | 否 | 是否启用。 |

### PUT `/api/redeem-codes/:id`

Path：`id` 为兑换码 ID。Body 同创建接口。

### DELETE `/api/redeem-codes/:id`

删除兑换码。

### POST `/api/user/redeem-code`

用户兑换接口。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `code` | string | 是 | 兑换码。 |

## Meta Model

### GET `/api/meta-models`

返回 Meta Model 列表。

### POST `/api/meta-models`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 名称。 |
| `description` | string | 否 | 描述。 |
| `model_name` | string | 是 | 对外模型名。 |
| `definition` | object/string | 是 | Meta Model DSL。 |
| `enabled` | boolean | 否 | 是否启用。 |

### POST `/api/meta-models/validate`

Body 同 Meta Model 创建 payload，用于校验 DSL。

返回校验结果和错误信息。

### PUT `/api/meta-models/:id`

Path：`id` 为 Meta Model ID。Body 同创建接口。

### DELETE `/api/meta-models/:id`

删除 Meta Model。

## 高级聊天管理设置

### GET `/api/advanced-chat/settings`

返回高级聊天管理设置。

### PUT `/api/advanced-chat/settings`

Body 可包含高级聊天启用状态、默认模型、默认系统提示、MCP/连接器策略等设置字段。返回更新后的设置。

## 高级聊天用户设置

### GET `/api/user/advanced-chat/settings`

返回用户高级聊天设置、MCP 服务器、默认 Agent/Skill 配置。

### PUT `/api/user/advanced-chat/mcp-servers`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `servers` | array | 是 | MCP 服务器列表。 |

## 高级聊天运行

### POST `/api/user/advanced-chat/completions`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model` | string | 是 | 模型名。 |
| `messages` | array | 是 | 消息数组。 |
| `session_id` | string | 否 | 会话 ID。 |
| `agent_id` | string | 否 | Agent ID。 |
| `skill_ids` | array | 否 | Skill ID 列表。 |
| `mcp_servers` | array | 否 | 临时 MCP 服务器。 |
| `stream` | boolean | 否 | 是否流式。 |

返回：运行结果、运行 ID 或 SSE 流。

### GET `/api/user/advanced-chat/runs/:id`

返回运行详情。

### GET `/api/user/advanced-chat/runs/:id/events`

返回运行事件列表。

### POST `/api/user/advanced-chat/runs/:id/stop`

停止运行。

### GET `/api/user/advanced-chat/runs/:id/connector-tasks/pending`

返回待审批连接器任务。

### POST `/api/user/advanced-chat/connector-tasks/:id/decision`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `approved` | boolean | 是 | 是否批准。 |
| `input` | object | 否 | 调整后的连接器输入。 |

## 高级聊天会话

### GET `/api/user/advanced-chat/sessions`

返回会话列表。

### POST `/api/user/advanced-chat/sessions`

会话字段：`title`、`messages`、`model`、`agent_id`、`skill_ids`、`metadata`。

### GET `/api/user/advanced-chat/sessions/:id`

返回会话详情。

### PUT `/api/user/advanced-chat/sessions/:id`

更新会话，Body 同创建接口。

### DELETE `/api/user/advanced-chat/sessions/:id`

删除会话。

## 连接器设备

### GET `/api/user/advanced-chat/devices`

返回连接器设备列表。

### POST `/api/user/advanced-chat/devices/token`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 设备名称。 |

返回设备 token。

### POST `/api/user/advanced-chat/devices/:id/token`

轮换设备 token。

### PUT `/api/user/advanced-chat/devices/:id`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 设备名称。 |

### DELETE `/api/user/advanced-chat/devices/:id`

删除设备。

## Agent 和 Skill

### GET/POST/PUT/DELETE `/api/user/advanced-chat/agents`

Agent 字段：`name`、`description`、`system_prompt`、`model`、`tools`、`mcp_servers`、`enabled`。

### GET/POST/PUT/DELETE `/api/user/advanced-chat/skills`

Skill 字段：`name`、`description`、`prompt`、`content`、`enabled`。
