# API 参考

本页汇总后端全部 HTTP 接口，按鉴权层级分组。具体行为见各对应文档。

## 鉴权层级

| 分组 | 前缀 | 鉴权 |
| --- | --- | --- |
| 公开 | `/health`、`/api/public/*`、`/api/setup/*`、`/api/pricing`、支付回调 | 无 |
| 认证 | `/auth/*` | 登录相关，无需已登录 |
| 网关 | `/v1/*`、`/v1beta/*` | API 密钥（`sk-`）或会话，经 `AuthMiddleware` + 限流 |
| 管理 | `/api/*` | 会话 JWT + 管理员 |
| 用户 | `/api/user/*` | 会话 JWT（本人） |

## 公开

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/health` | 健康检查 |
| `GET` | `/api/public/settings` | 公开站点设置 |
| `GET` | `/api/public/models` | 公开模型目录 |
| `GET` | `/api/public/status` | 公开状态页数据 |
| `GET` | `/api/public/announcements` | 公开公告 |
| `GET` | `/api/pricing` | 公开定价（需 `pricing_endpoint_enabled`） |
| `GET` | `/api/setup/status` | 是否需要初始化 |
| `POST` | `/api/setup` | 创建首位管理员 |

## 支付回调

| 方法 | 路径 |
| --- | --- |
| `GET` | `/api/payment/yipay/return` |
| `GET/POST` | `/api/payment/yipay/notify` |
| `GET` | `/api/payment/openpayment/return` |
| `GET/POST` | `/api/payment/openpayment/notify` |
| `GET` | `/api/payment/openpayment/submit/:order_no` |

## 认证 `/auth`

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `POST` | `/auth/password/login` | 密码登录 |
| `POST` | `/auth/password/register` | 注册 |
| `POST` | `/auth/password/email-code` | 发送邮箱验证码 |
| `POST` | `/auth/passkey/login/options` | Passkey 登录挑战 |
| `POST` | `/auth/passkey/login` | Passkey 登录完成 |
| `GET` | `/auth/login` | 发起 OIDC 登录 |
| `GET` | `/auth/callback` | OIDC 回调 |

## 网关 `/v1`、`/v1beta`

| 方法 | 路径 | 协议 |
| --- | --- | --- |
| `GET` | `/v1/models` | 列出可用模型 |
| `POST` | `/v1/chat/completions` | OpenAI |
| `POST` | `/v1/completions` | OpenAI |
| `POST` | `/v1/responses` | OpenAI Responses |
| `POST` | `/v1/images/generations` | 图像生成 |
| `POST` | `/v1/messages` | Claude Messages |
| `POST` | `/v1/models/:modelAction` | Gemini |
| `POST` | `/v1beta/models/:modelAction` | Gemini |

详见 [调用网关](/guide/calling-the-api) 与 [兼容协议](/guide/protocols)。

## 管理 `/api`（管理员）

### 系统设置 / 公告 / 状态监控

| 方法 | 路径 |
| --- | --- |
| `GET` `PUT` | `/api/settings` |
| `GET` `POST` | `/api/status-monitors` |
| `PUT` `DELETE` | `/api/status-monitors/:id` |
| `POST` | `/api/status-monitors/:id/check` |
| `GET` `POST` | `/api/announcements` |
| `PUT` `DELETE` | `/api/announcements/:id` |

### 渠道与模型

| 方法 | 路径 |
| --- | --- |
| `GET` `POST` | `/api/channels` |
| `PUT` `DELETE` | `/api/channels/:id` |
| `PUT` | `/api/channels/:id/group-multipliers` |
| `GET` `POST` | `/api/channels/:id/models` |
| `POST` | `/api/channels/sync` |
| `GET` `POST` | `/api/models` |
| `POST` | `/api/models/sync`、`/api/models/sync/preview`、`/api/models/sync/preview/browser`、`/api/models/sync/apply` |
| `POST` | `/api/models/prices/sync/preview`、`.../preview/browser`、`.../apply` |
| `PUT` `DELETE` | `/api/models/:id` |
| `PUT` `DELETE` | `/api/channel-models/:id` |
| `PUT` | `/api/channel-models/:id/group-multipliers` |

### 用户渠道 / 分组 / 用户

| 方法 | 路径 |
| --- | --- |
| `GET` `POST` | `/api/user-channels` |
| `PUT` `DELETE` | `/api/user-channels/:id` |
| `GET` `POST` | `/api/groups` |
| `PUT` `DELETE` | `/api/groups/:id` |
| `GET` | `/api/users` |
| `PUT` `DELETE` | `/api/users/:id` |
| `GET` | `/api/referral-commissions` |

### 统计

| 方法 | 路径 |
| --- | --- |
| `GET` | `/api/logs` |
| `GET` | `/api/stats` |
| `GET` | `/api/channel-usage` |

## 用户 `/api/user`（本人）

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/api/user/me` | 当前用户 |
| `GET` | `/api/user/catalog` | 可用目录 |
| `GET` | `/api/user/stats`、`/api/user/logs` | 个人统计与日志 |
| `GET` | `/api/user/referral` | 邀请信息 |
| `GET` | `/api/user/check-in/status`、`/check-in/records` | 签到状态/记录 |
| `POST` | `/api/user/check-in` | 签到 |
| `GET` | `/api/user/payment/config`、`/payment/orders` | 支付配置/订单 |
| `POST` | `/api/user/payment/orders` | 创建充值订单 |
| `GET` | `/api/user/payment/orders/:order_no` | 订单详情 |
| `GET` `POST` `DELETE` | `/api/user/passkeys`、`/passkeys/register/*`、`/passkeys/:id` | Passkey 管理 |
| `GET` `POST` | `/api/user/password/method`、`/password/email-code`、`/password/change` | 改密 |
| `POST` | `/api/user/oidc/bind-url` | 绑定 OIDC |
| `GET` `POST` `PUT` `DELETE` | `/api/user/api-keys`、`/api-keys/:id` | 密钥管理 |
| `POST` | `/api/user/api-key/rotate` | 轮换密钥 |

::: tip 专业版扩展
专业版通过路由 Hook 在 `/api`（管理）与 `/api/user`（用户）下追加接口，如 Meta Model 管理 `GET/POST/PUT/DELETE /api/meta-models` 与 `POST /api/meta-models/validate`。这些不在社区版中，详见 [Meta Model DSL](/develop/meta-model-dsl)。
:::
