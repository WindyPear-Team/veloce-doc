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
