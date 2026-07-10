# 高级版接口

高级版接口通过 route hook 注册。社区版不会注册这些路由。

管理员扩展仍使用：

```text
Authorization: Bearer <jwt>
```

并要求管理员权限。用户扩展使用普通登录 JWT。

## 订阅套餐管理

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/subscription-plans` | 无 | 无 | 订阅套餐列表。 |
| `POST` | `/api/subscription-plans` | 无 | 套餐名称、额度、周期、价格、启用状态等。 | 新建套餐。 |
| `PUT` | `/api/subscription-plans/:id` | Path: `id`。 | 套餐字段。 | 更新后的套餐。 |
| `DELETE` | `/api/subscription-plans/:id` | Path: `id`。 | 无 | 删除成功响应。 |

## 兑换码管理

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/redeem-codes` | 无 | 无 | 兑换码列表。 |
| `POST` | `/api/redeem-codes` | 无 | 兑换码、金额、分组、订阅套餐、有效期、启用状态等。 | 新建兑换码。 |
| `PUT` | `/api/redeem-codes/:id` | Path: `id`。 | 兑换码字段。 | 更新后的兑换码。 |
| `DELETE` | `/api/redeem-codes/:id` | Path: `id`。 | 无 | 删除成功响应。 |

## Meta Model

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/meta-models` | 无 | 无 | Meta Model 列表。 |
| `POST` | `/api/meta-models` | 无 | `name`、`description`、DSL 配置、启用状态等。 | 新建 Meta Model。 |
| `POST` | `/api/meta-models/validate` | 无 | Meta Model DSL。 | 校验结果。 |
| `PUT` | `/api/meta-models/:id` | Path: `id`。 | Meta Model 字段。 | 更新后的 Meta Model。 |
| `DELETE` | `/api/meta-models/:id` | Path: `id`。 | 无 | 删除成功响应。 |

## 助理聊天管理设置

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/advanced-chat/settings` | 无 | 无 | 助理聊天管理设置。 |
| `PUT` | `/api/advanced-chat/settings` | 无 | 助理聊天设置字段。 | 更新后的设置。 |

## 用户订阅

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/user/subscription` | 无 | 无 | 当前用户有效订阅列表。 |
| `POST` | `/api/user/redeem-code` | 无 | `code`。 | 兑换结果，可能包含余额、分组或订阅变化。 |

兑换请求：

```json
{
  "code": "ABCD-EFGH"
}
```

## 助理聊天用户接口

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/user/advanced-chat/settings` | 无 | 无 | 当前用户助理聊天设置。 |
| `POST` | `/api/user/advanced-chat/completions` | 无 | 助理聊天请求体、消息、工具和会话上下文。 | 运行结果或运行 ID。 |
| `GET` | `/api/user/advanced-chat/sessions` | Query: 分页或过滤条件。 | 无 | 会话列表。 |
| `POST` | `/api/user/advanced-chat/sessions` | 无 | 会话标题、消息、配置等。 | 保存后的会话。 |
| `GET` | `/api/user/advanced-chat/sessions/:id` | Path: `id`。 | 无 | 会话详情。 |
| `PUT` | `/api/user/advanced-chat/sessions/:id` | Path: `id`。 | 会话字段。 | 更新后的会话。 |
| `DELETE` | `/api/user/advanced-chat/sessions/:id` | Path: `id`。 | 无 | 删除成功响应。 |
| `GET` | `/api/user/advanced-chat/runs/:id` | Path: `id`。 | 无 | 运行详情。 |
| `GET` | `/api/user/advanced-chat/runs/:id/events` | Path: `id`。 | 无 | 运行事件列表。 |
| `POST` | `/api/user/advanced-chat/runs/:id/stop` | Path: `id`。 | 无 | 停止成功响应。 |
| `GET` | `/api/user/advanced-chat/runs/:id/connector-tasks/pending` | Path: `id`。 | 无 | 待审批连接器任务。 |
| `POST` | `/api/user/advanced-chat/connector-tasks/:id/decision` | Path: `id`。 | 审批决定和参数。 | 审批结果。 |

## 连接器设备、Agent、Skill

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/user/advanced-chat/devices` | 无 | 无 | 连接器设备列表。 |
| `POST` | `/api/user/advanced-chat/devices/token` | 无 | 设备信息。 | 新设备令牌。 |
| `POST` | `/api/user/advanced-chat/devices/:id/token` | Path: `id`。 | 无 | 轮换后的设备令牌。 |
| `PUT` | `/api/user/advanced-chat/devices/:id` | Path: `id`。 | 设备字段。 | 更新后的设备。 |
| `DELETE` | `/api/user/advanced-chat/devices/:id` | Path: `id`。 | 无 | 删除成功响应。 |
| `PUT` | `/api/user/advanced-chat/mcp-servers` | 无 | MCP 服务器列表。 | 更新后的配置。 |
| `GET` | `/api/user/advanced-chat/agents` | 无 | 无 | Agent 列表。 |
| `POST` | `/api/user/advanced-chat/agents` | 无 | Agent 名称、提示词、工具和模型配置。 | 新建 Agent。 |
| `PUT` | `/api/user/advanced-chat/agents/:id` | Path: `id`。 | Agent 字段。 | 更新后的 Agent。 |
| `DELETE` | `/api/user/advanced-chat/agents/:id` | Path: `id`。 | 无 | 删除成功响应。 |
| `GET` | `/api/user/advanced-chat/skills` | 无 | 无 | Skill 列表。 |
| `POST` | `/api/user/advanced-chat/skills` | 无 | Skill 名称、描述、提示词或执行配置。 | 新建 Skill。 |
| `PUT` | `/api/user/advanced-chat/skills/:id` | Path: `id`。 | Skill 字段。 | 更新后的 Skill。 |
| `DELETE` | `/api/user/advanced-chat/skills/:id` | Path: `id`。 | 无 | 删除成功响应。 |
