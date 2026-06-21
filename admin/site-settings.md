# 站点与界面设置

平台的品牌、文案、导航和界面开关都存放在数据库系统设置里，在后台「系统设置」中修改。本页汇总常用的展示类设置项。运行参数（端口、数据库、JWT 等）见 [环境变量](/admin/configuration)。

## 品牌与文案

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `site_name` | `flai` | 站点名称 |
| `base_url` | 空 | 站点对外基础地址，用于拼接支付回调等，**务必设为对外 HTTPS 域名** |
| `icon_url` | 空 | 站点图标地址 |
| `footer_text` | 空 | 页脚文案 |
| `about_html` | 空 | 「关于」页 HTML 内容 |
| `home_iframe_url` | 空 | 首页可嵌入的外部页面地址 |
| `privacy_policy` | 空 | 隐私政策 |
| `terms` | 空 | 服务条款 |
| `announcement` | 空 | 站点级横幅公告 |

## 顶部导航

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `top_nav_enabled` | `false` | 是否启用自定义顶部导航 |
| `top_nav_items` | 空 | 顶部导航项（JSON） |

## 侧边栏开关

控制后台侧边栏各入口的显隐，便于按需裁剪界面：

| 设置键 | 默认 |
| --- | --- |
| `sidebar_dashboard_enabled` | `true` |
| `sidebar_usage_enabled` | `true` |
| `sidebar_wallet_enabled` | `true` |
| `sidebar_data_board_enabled` | `true` |
| `sidebar_api_keys_enabled` | `true` |
| `sidebar_chat_enabled` | `true` |
| `sidebar_images_enabled` | `true` |
| `sidebar_settings_enabled` | `true` |
| `sidebar_system_enabled` | `true` |
| `sidebar_admin_overview_enabled` | `true` |
| `sidebar_channels_enabled` | `true` |
| `sidebar_models_enabled` | `true` |
| `sidebar_users_enabled` | `true` |

关闭某项只是隐藏入口，不代表关闭后端能力——真正关闭功能要用对应的功能开关（如 `payment_enabled`、`checkin_enabled`）。

## 功能开关速查

| 设置键 | 控制的功能 |
| --- | --- |
| `payment_enabled` | [支付与充值](/admin/payment) |
| `checkin_enabled` | [签到](/admin/checkin-referral) |
| `referral_enabled` | [邀请返佣](/admin/checkin-referral) |
| `status_monitor_enabled` | [状态监控页](/admin/announcements-status) |
| `pricing_endpoint_enabled` | 公开定价端点 `GET /api/pricing` |
| `rate_limit_enabled` | [限流](/admin/security) |
| `sensitive_filter_enabled` | [敏感词过滤](/admin/security) |
| `ssrf_protection_enabled` | [SSRF 防护](/admin/security) |
| `oidc_enabled` / `passkey_enabled` / `password_login_enabled` | [登录方式](/admin/security) |

## 接口

| 操作 | 接口 |
| --- | --- |
| 公开设置（前端无需登录即可读取的部分） | `GET /api/public/settings` |
| 管理读取（含敏感项如密钥/SMTP 密码） | `GET /api/settings` |
| 更新 | `PUT /api/settings` |

::: warning 公开 vs 管理设置
`GET /api/public/settings` 只返回展示类、非敏感设置；OIDC 密钥、SMTP 密码、支付密钥等仅在管理员的 `GET /api/settings` 中返回。修改时通过 `PUT /api/settings` 提交。
:::

## SMTP（邮件）

用于发送注册/改密验证码等邮件：

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `smtp_host` | 空 | SMTP 服务器 |
| `smtp_port` | `587` | 端口 |
| `smtp_username` | 空 | 用户名 |
| `smtp_password` | 空 | 密码 |
| `smtp_from` | 空 | 发件人地址 |

启用邮箱验证（`email_verification_required`）前，请先配置好 SMTP，否则验证码无法送达。
