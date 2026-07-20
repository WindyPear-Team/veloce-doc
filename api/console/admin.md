# 管理员控制台接口

管理员控制台接口前缀为 `/api`，需要登录 JWT 且用户是管理员。

## 仪表盘

### GET `/api/stats`

返回管理员首页统计：用户数、调用量、消费、收入、趋势等。

### GET `/api/logs`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | Query | number | 否 | 页码。 |
| `page_size` | Query | number | 否 | 每页数量。 |
| `user_id` | Query | number | 否 | 用户过滤。 |
| `api_key_id` | Query | number | 否 | API Key 过滤。 |
| `model` | Query | string | 否 | 模型过滤。 |
| `from` | Query | string | 否 | 开始时间。 |
| `to` | Query | string | 否 | 结束时间。 |

返回用量日志分页对象。

### GET `/api/channel-usage`

返回用户渠道和上级渠道用量统计。

## 系统设置

### GET `/api/settings`

返回完整系统设置对象。控制台系统管理页、页面布局编辑器都会调用。

### PUT `/api/settings`

Body 可包含系统设置字段。常见字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `site_name` | string | 站点名称。 |
| `site_description` | string | 站点描述。 |
| `logo_url` | string | Logo。 |
| `registration_enabled` | boolean | 是否允许注册。 |
| `password_login_enabled` | boolean | 密码登录。 |
| `oidc_enabled` | boolean | OIDC 登录。 |
| `passkey_enabled` | boolean | Passkey。 |
| `smtp_*` | string/number/boolean | SMTP 配置。 |
| `payment_*` | string/number/boolean/array | 支付配置。 |
| `check_in_*` | string/number/boolean | 签到配置。 |
| `referral_*` | string/number/boolean | 邀请返佣配置。 |
| `theme_*` | string | 主题颜色。 |
| `page_layouts` | object | 页面布局配置。 |
| `pricing_endpoint_enabled` | boolean | 是否开放价格接口。 |
| `status_page_enabled` | boolean | 是否开放状态页。 |

返回更新后的系统设置或成功响应。

### POST `/api/settings/export`

导出系统设置、用户渠道、上游渠道、全局模型和渠道模型配置。响应为 JSON 配置备份，可能包含上游 API Key，应作为机密文件保存。

### POST `/api/settings/import`

导入此前导出的配置备份。会覆盖同名配置，但不会删除备份文件中不存在的已有记录；用户、余额、订单和日志不在导入范围内。具体范围和风险见[运行维护](/admin/operations#配置备份与恢复)。

### DELETE `/api/logs`

按当前日志设置清理日志数据库中的记录。

### GET `/api/updates`

返回自动更新器状态，包括当前构建版本和更新配置。

### POST `/api/updates/check`

立即向 Release 源检查是否存在可用更新。仅官方 Release 二进制可用；本地开发构建的版本为 `dev`。详见[自动更新](/admin/operations#自动更新)。

## 用户渠道

### GET `/api/user-channels`

返回用户渠道列表。

### POST `/api/user-channels`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 用户渠道名称。 |
| `routing_algorithm` | string | 否 | `priority`、`round_robin`、`weighted_round_robin`。 |
| `enabled` | boolean | 否 | 是否启用。 |

### PUT `/api/user-channels/:id`

Path：`id` 为用户渠道 ID。Body 同创建接口。

### DELETE `/api/user-channels/:id`

删除用户渠道。

## 上级渠道

### GET `/api/channels`

返回上级渠道列表。

### POST `/api/channels`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 渠道名称。 |
| `type` | string | 是 | `openai`、`responses`、`openai-video`、`kling`、`claude`、`gemini` 等。 |
| `base_url` | string | 是 | 上游 Base URL。 |
| `api_key` | string | 否 | 上游 API Key。 |
| `user_channel_id` | number | 否 | 所属用户渠道。 |
| `priority` | number | 否 | 优先级。 |
| `weight` | number | 否 | 权重。 |
| `enabled` | boolean | 否 | 是否启用。 |

### PUT `/api/channels/:id`

Path：`id` 为渠道 ID。Body 同创建接口。

### DELETE `/api/channels/:id`

删除上级渠道。

### PUT `/api/channels/:id/group-multipliers`

Body：

```json
[
  { "group_id": 1, "multiplier": "1.2" }
]
```

## 渠道模型配置

### GET `/api/channels/:id/models`

Path：`id` 为渠道 ID。返回该渠道的模型配置列表。

### POST `/api/channels/:id/models`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model_id` | number | 是 | 全局模型 ID。 |
| `upstream_model_name` | string | 否 | 上游真实模型名。 |
| `input_price` | string/number | 否 | 覆盖输入价格。 |
| `output_price` | string/number | 否 | 覆盖输出价格。 |
| `cached_input_price` | string/number | 否 | 缓存输入价格。 |
| `image_input_price` | string/number | 否 | 图片输入价格。 |
| `image_output_price` | string/number | 否 | 图片输出价格。 |
| `enabled` | boolean | 否 | 是否启用。 |

### PUT `/api/channel-models/:id`

Path：`id` 为渠道模型配置 ID。Body 同创建接口。

### DELETE `/api/channel-models/:id`

删除渠道模型配置。

### PUT `/api/channel-models/:id/group-multipliers`

Body 同渠道分组倍率。

## 模型管理

### GET `/api/models`

返回全局模型列表。

### POST `/api/models`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `model_name` | string | 是 | 对外模型名。 |
| `display_name` | string | 否 | 显示名。 |
| `provider` | string | 否 | 供应商 ID。 |
| `provider_name` | string | 否 | 供应商名称。 |
| `provider_icon_url` | string | 否 | 供应商图标。 |
| `input_price` | string/number | 否 | 输入价格。 |
| `output_price` | string/number | 否 | 输出价格。 |
| `cached_input_price` | string/number | 否 | 缓存输入价格。 |
| `image_input_price` | string/number | 否 | 图片输入价格。 |
| `image_output_price` | string/number | 否 | 图片输出价格。 |
| `quota_type` | number | 否 | 计费类型，视频组合计费为 `100`。 |
| `video_billing_config` | object | 否 | 视频分辨率和时长组合计费配置。 |
| `enabled` | boolean | 否 | 是否启用。 |

### PUT `/api/models/:id`

Path：`id` 为模型 ID。Body 同创建接口。

### DELETE `/api/models/:id`

删除模型。

### POST `/api/models/sync`

同步渠道模型。

### POST `/api/models/sync/preview`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `channel_id` | number | 渠道 ID。 |
| `format` | string | 同步格式。 |
| `path` | string | 自定义路径。 |

### POST `/api/models/sync/preview/browser`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `channel_id` | number | 渠道 ID。 |
| `source` | string | 来源 URL 或标识。 |
| `body` | object/array/string | 浏览器侧获取到的原始响应。 |

### POST `/api/models/sync/apply`

Body：预览项列表或同步应用 payload。返回应用结果。

### POST `/api/models/prices/sync/preview`

预览价格同步，字段同模型同步预览。

### POST `/api/models/prices/sync/preview/browser`

浏览器侧价格同步预览，字段同 browser 预览。

### POST `/api/models/prices/sync/apply`

应用价格同步结果。

## 分组、用户、公告、状态页

### GET/POST/PUT/DELETE `/api/groups`

分组字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 分组名称。 |
| `multiplier` | string/number | 价格倍率。 |
| `is_default` | boolean | 是否默认分组。 |

### GET/PUT/DELETE `/api/users`

用户更新字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `username` | string | 用户名。 |
| `email` | string | 邮箱。 |
| `balance` | string/number | 余额。 |
| `group_ids` | array | 分组 ID。 |
| `is_admin` | boolean | 是否管理员。 |
| `enabled` | boolean | 是否启用。 |

### GET/POST/PUT/DELETE `/api/announcements`

公告字段：`title`、`content`、`enabled`、`sort_order`。

### GET/POST/PUT/DELETE `/api/status-monitors`

状态监控字段：`name`、`type`、`target`、`enabled`、`interval_seconds` 等。

### POST `/api/status-monitors/:id/check`

立即检查一个状态监控。

## 云沙箱主机

这些接口用于管理员维护托管云沙箱的执行主机。主机本身通过连接器身份接入，用户只能选择已启用且在线的主机创建沙箱。

### GET/POST `/api/advanced-chat/sandbox-hosts`

查询或新建沙箱主机。创建时可设置 `name`、`security_policy`、运行时/CPU/内存/存储的小时费率、`runtime_multiplier` 与 `enabled`。创建响应包含主机接入 token，只在创建或轮换时显示。

### PUT `/api/advanced-chat/sandbox-hosts/:id`

更新主机名称、启用状态、安全策略或计费费率。

### POST `/api/advanced-chat/sandbox-hosts/:id/token`

轮换指定沙箱主机的连接 token。
