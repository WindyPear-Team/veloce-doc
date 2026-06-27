# GET `/api/settings`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/settings` |
| 鉴权 | 管理员 |

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

完整系统设置对象。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `edition` | string | 版本：community 或 premium。 |
| `site_name` | string | 站点名称。 |
| `base_url` | string | 站点 Base URL。 |
| `icon_url` | string | 站点图标。 |
| `footer_text` | string | 页脚文本。 |
| `about_html` | string | 关于页面 HTML。 |
| `home_iframe_url` | string | 首页 iframe URL。 |
| `privacy_policy` | string | 隐私政策文本。 |
| `terms` | string | 服务条款文本。 |
| `privacy_policy_url` | string | 隐私政策链接。 |
| `terms_url` | string | 服务条款链接。 |
| `auth_agreement_mode` | string | 协议展示方式：notice 或 checkbox。 |
| `announcement` | string | 全局公告。 |
| `top_nav_enabled` | boolean | 是否启用顶部导航。 |
| `top_nav_items` | string | 顶部导航 JSON 字符串。 |
| `page_layouts` | string | 页面布局 JSON 字符串。 |
| `theme_*` | string | 浅色/深色主题色字段。 |
| `sidebar_*_enabled` | boolean | 各控制台侧边栏入口是否启用。 |
| `chat_page_mode` | string | 聊天页面模式：basic 或 advanced。 |
| `referral_enabled` | boolean | 邀请返佣是否启用。 |
| `referral_commission_rate` | string | 返佣比例。 |
| `group_multiplier_mode` | string | 分组倍率叠加方式。 |
| `pricing_endpoint_enabled` | boolean | 是否公开 /api/pricing。 |
| `status_monitor_enabled` | boolean | 是否公开状态页。 |
| `checkin_*` | string/boolean | 签到配置。 |
| `payment_*` | string/boolean | 支付公开配置。 |
| `rate_limit_*` | string/boolean | 高级版限速公开配置。 |
| `sensitive_filter_*` | string/boolean | 高级版敏感词配置公开部分。 |
| `ssrf_*` | string/boolean | 高级版 SSRF 防护配置公开部分。 |
| `oidc_enabled` | boolean | OIDC 登录是否启用。 |
| `passkey_enabled` | boolean | Passkey 是否启用。 |
| `password_login_enabled` | boolean | 密码登录是否启用。 |
| `password_registration_enabled` | boolean | 密码注册是否启用。 |
| `password_hcaptcha_enabled` | boolean | 密码流程是否启用 hCaptcha。 |
| `hcaptcha_site_key` | string | hCaptcha Site Key。 |
| `email_verification_required` | boolean | 注册是否要求邮箱验证码。 |

管理员接口还会返回并可更新以下私密配置：oidc_issuer、oidc_client_id、oidc_client_secret、oidc_redirect_url、hcaptcha_secret、smtp_host、smtp_port、smtp_username、smtp_password、smtp_from、sensitive_words、ssrf_allowed_hosts、payment_yipay_gateway_url、payment_yipay_pid、payment_yipay_key、payment_yipay_notify_url、payment_yipay_return_url、payment_openpayment_base_url、payment_openpayment_config_url、payment_openpayment_merchant_id、payment_openpayment_key、payment_openpayment_notify_url、payment_openpayment_return_url。

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

