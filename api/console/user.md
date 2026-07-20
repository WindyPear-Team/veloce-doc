# 用户控制台接口

用户控制台接口前缀为 `/api/user`，需要登录 JWT。

## 用户首页

### GET `/api/user/me`

返回当前用户。

返回字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 用户 ID。 |
| `username` | string | 用户名。 |
| `email` | string | 邮箱。 |
| `balance` | string/number | 余额。 |
| `is_admin` | boolean | 是否管理员。 |
| `group` | object | 当前分组。 |
| `created_at` | string | 注册时间。 |

### GET `/api/user/catalog`

返回用户可用目录，用于聊天、图片、视频、Agent 和 API Key 页面。

返回字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `channels` | array | 可选用户渠道。 |
| `models` | array/map | 可用模型。 |
| `prices` | object | 有效价格。 |
| `quota_type` | object | 模型计费类型。 |
| `video_billing_configs` | object | 视频组合计费配置。 |

### GET `/api/user/stats`

返回当前用户仪表盘统计，包括余额、调用量、消费、趋势等。

### GET `/api/user/logs`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | Query | number | 否 | 页码。 |
| `page_size` | Query | number | 否 | 每页数量。 |
| `api_key_id` | Query | number | 否 | 按 API Key 过滤。 |
| `model` | Query | string | 否 | 按模型过滤。 |
| `from` | Query | string | 否 | 开始时间。 |
| `to` | Query | string | 否 | 结束时间。 |

返回：用量日志分页对象。

## 邀请与签到

### GET `/api/user/referral`

返回当前用户邀请码、邀请人数、返佣统计和返佣配置。

### GET `/api/user/check-in/status`

返回签到配置、今日是否已签到、可领取奖励。

### GET `/api/user/check-in/records`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | Query | number | 否 | 页码。 |
| `page_size` | Query | number | 否 | 每页数量。 |
| `from` | Query | string | 否 | 开始时间。 |
| `to` | Query | string | 否 | 结束时间。 |

返回：签到记录分页对象。

### POST `/api/user/check-in`

请求体：无。

返回：签到结果和奖励金额。

## 钱包和充值

### GET `/api/user/payment/config`

返回字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `enabled` | boolean | 是否启用支付。 |
| `currency_display_name` | string | 货币显示名称。 |
| `usd_to_rmb_rate` | string | 汇率。 |
| `min_recharge_amount` | string | 最小充值金额。 |
| `recharge_presets` | array | 预设充值金额。 |
| `methods` | array | 可用支付方式。 |

### GET `/api/user/payment/orders`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | Query | number | 否 | 页码。 |
| `page_size` | Query | number | 否 | 每页数量。 |
| `from` | Query | string | 否 | 开始时间。 |
| `to` | Query | string | 否 | 结束时间。 |

返回：订单数组或分页对象。

### POST `/api/user/payment/orders`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `amount` | Body | string | 是 | 充值金额，平台余额单位。 |
| `method` | Body | string | 是 | 支付方式，如 `alipay`、`wxpay`。 |

返回：

```json
{
  "order_no": "20260101000000xxxx",
  "amount": "10",
  "rmb_amount": "72.00",
  "method": "alipay",
  "status": "pending",
  "payment_url": "https://..."
}
```

### GET `/api/user/payment/orders/:order_no`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `order_no` | Path | string | 是 | 订单号。 |

返回：订单详情。

## API Key 管理

### GET `/api/user/api-keys`

返回当前用户 API Key 列表。明文 key 只在创建或轮换时返回。

### POST `/api/user/api-keys`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | Body | string | 是 | 名称。 |
| `allowed_models` | Body | array | 否 | 允许使用的模型名；空表示不限。 |
| `allowed_user_channels` | Body | array | 否 | 允许使用的用户渠道 ID；空表示不限。 |
| `ip_whitelist` | Body | array/string | 否 | IP 白名单。 |
| `quota` | Body | string/number | 否 | API Key 总额度。 |
| `enabled` | Body | boolean | 否 | 是否启用。 |

返回：API Key 对象和明文 `key`。

### PUT `/api/user/api-keys/:id`

Path：`id` 为 API Key ID。

Body 字段同创建接口；返回更新后的 API Key。

### POST `/api/user/api-keys/:id/rotate`

Path：`id` 为 API Key ID。

返回新的明文 API Key。

### POST `/api/user/api-keys/:id/reset-usage`

Path：`id` 为 API Key ID。

返回重置成功响应。

### DELETE `/api/user/api-keys/:id`

Path：`id` 为 API Key ID。

返回删除成功响应。

### POST `/api/user/api-key/rotate`

旧版兼容接口。新控制台应优先使用 `/api/user/api-keys/:id/rotate`。

## 账号设置

### GET `/api/user/password/method`

返回当前用户修改密码可用方式。

### POST `/api/user/password/email-code`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `email` | Body | string | 否 | 邮箱，默认当前用户邮箱。 |
| `captcha_token` | Body | string | 否 | 验证码 token。 |

### POST `/api/user/password/change`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `current_password` | Body | string | 视修改方式而定 | 当前密码。 |
| `email_code` | Body | string | 视修改方式而定 | 邮箱验证码。 |
| `new_password` | Body | string | 是 | 新密码。 |

### POST `/api/user/oidc/bind-url`

请求体：无。

返回：

```json
{
  "auth_url": "https://..."
}
```

## Passkey 管理

### GET `/api/user/passkeys`

返回当前用户 Passkey 列表。

### POST `/api/user/passkeys/register/options`

创建 Passkey 注册挑战。

### POST `/api/user/passkeys/register`

Body：浏览器 WebAuthn 注册响应。

返回：注册成功响应。

### DELETE `/api/user/passkeys/:id`

Path：`id` 为 Passkey ID。

返回删除成功响应。

## 工作室运营

工作室运营接口前缀为 `/api/user/personal-company`。每个请求都需要带 `studio_id` 查询参数，用于指定当前用户拥有的工作室；它与企业组织接口相互独立。

### GET `/api/user/personal-company?studio_id=:studio_id`

返回工作室运营面板，包括运营状态、当前章程、目标、工作项、审批、成本与余额保护摘要。首次读取一个已存在的工作室时会建立默认运营记录。

### POST `/api/user/personal-company/bootstrap?studio_id=:studio_id`

显式初始化工作室运营。Body 可包含 `name`、`mission`、`timezone`、`daily_budget`、`monthly_budget`、`balance_floor`、`autonomy_level`、`goals`、`data_boundaries` 与 `prohibited_actions`。金额不能为负数。

### PUT `/api/user/personal-company/charter?studio_id=:studio_id`

创建新的章程版本。Body 包含 `mission`、`goals`、`data_boundaries`、`prohibited_actions` 和 `approval_policy`；结构化字段必须是合法 JSON。

### POST `/api/user/personal-company/pause` / `resume`

暂停或恢复工作室调度。两个接口均需 `studio_id` 查询参数。

### PUT `/api/user/personal-company/runtime?studio_id=:studio_id`

配置工作室执行环境：`connector_device_id`、`connector_workspace_path`、`connector_command_prefixes`，或 `cloud_sandbox_id`。云沙箱与本地连接器/工作目录只能二选一。

### PUT `/api/user/personal-company/scheduler?studio_id=:studio_id`

Body：`{ "max_concurrent_tasks": 1 }`。并发工作数必须在 `1` 到 `8` 之间。

### 工作与审批

`/api/user/personal-company` 下还提供目标、团队、招聘、工作项、交接和审批接口，例如：

- `GET` / `POST` `/objectives`；
- `GET` / `POST` `/work-items`，以及工作项的 `timeline`、`queue`、`run`、`cancel`、`handoffs` 和 `approve` 子路由；
- `GET` `/approvals` 与 `POST /approvals/:id/decide`；
- `POST /connector-approvals/:id/decide`。

这些接口均在相同前缀下并要求 `studio_id`。工作流、预算和审批语义见[工作室运营](/guide/advanced-chat-studio)。

## 托管云沙箱

用户沙箱接口前缀为 `/api/user/advanced-chat`，需要登录 JWT。

### GET `/api/user/advanced-chat/sandbox-hosts/available`

返回当前用户可选择的沙箱主机。

### GET/POST `/api/user/advanced-chat/cloud-sandboxes`

查询或创建自己的云沙箱。创建 Body 包含 `host_id`、`name`、`image`、`cpu_cores`、`memory_mb`、`disk_gb`。资源参数必须符合所选主机的可用范围。

### GET/DELETE `/api/user/advanced-chat/cloud-sandboxes/:id`

查询或删除自己创建的沙箱。删除后不能再新建任务使用该沙箱。

### GET `/api/user/advanced-chat/cloud-sandboxes/:id/charges`

查询该沙箱的运行和存储计费记录。完整的运行与计费说明见[托管云沙箱](/guide/advanced-chat-sandboxes)。
