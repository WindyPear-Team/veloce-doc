# 安全与防护

平台提供多项安全设置。需要注意：社区版把这些能力暴露为**扩展 Hook**，具体的强力实现（如完整的敏感词过滤、SSRF 校验、限流策略）可能由专业版注入。社区版在未注册 Hook 时以中立/基础行为运行。详见 [扩展点 Hooks](/develop/extension-hooks)。

## 认证与登录

通过系统设置控制开放哪些登录方式：

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `oidc_enabled` | `false` | OIDC 单点登录 |
| `passkey_enabled` | `false` | Passkey（WebAuthn） |
| `password_login_enabled` | `true` | 密码登录 |
| `password_registration_enabled` | `true` | 是否开放注册 |
| `password_hcaptcha_enabled` | `false` | 注册/登录 hCaptcha 人机验证 |
| `email_verification_required` | `false` | 是否强制邮箱验证 |

相关密钥项：`oidc_issuer` / `oidc_client_id` / `oidc_client_secret` / `oidc_redirect_url`、`hcaptcha_site_key` / `hcaptcha_secret`。

::: tip 对外平台建议
开放注册的公开平台建议：开启邮箱验证 + hCaptcha，配合 API 密钥的 IP/额度限制和限流，降低滥用与薅羊毛风险。
:::

## 速率限制（Rate Limit）

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `rate_limit_enabled` | `true` | 限流开关 |
| `rate_limit_requests_per_minute` | `60` | 每分钟请求数 |
| `rate_limit_burst` | `10` | 突发额度 |

限流中间件作用于网关入口（`/v1`、`/v1beta`）。触发时返回 `429`。具体限流算法由注册的限流工厂决定（社区版可不启用强限流，专业版可注入更完整策略）。

::: warning 真实客户端 IP
限流和 API 密钥的 IP 限制都依赖请求的客户端 IP。部署在反向代理后时，务必正确透传真实 IP，否则可能把所有用户当成同一个 IP。
:::

## 敏感词过滤

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `sensitive_filter_enabled` | `false` | 开关 |
| `sensitive_filter_scope` | `request` | 过滤范围：`request`（仅请求）或 `request_response`（请求+响应） |
| `sensitive_words` | 空 | 敏感词列表（管理员可见的敏感配置） |

开启后，命中敏感词的内容会被拦截。`request_response` 范围会同时检查上游返回的内容，开销更大。词库与匹配实现可由专业版增强。

## SSRF 防护

防止通过配置的上游/回调地址访问内网或敏感目标：

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `ssrf_protection_enabled` | `true` | 开关 |
| `ssrf_allow_private_networks` | `false` | 是否允许访问私有网段 |
| `ssrf_allowed_hosts` | 空 | 额外放行的主机白名单 |

平台在校验**配置的 URL**（如渠道 BaseURL、状态监控目标、出站请求）时应用该防护：

- `ValidateConfiguredHTTPURL` / `ValidateConfiguredTCPAddress` / `ValidateConfiguredStatusTarget` 校验管理员配置的地址；
- `ValidateOutboundHTTPURL` 校验出站请求目标。

默认禁止访问私有网段。若确有内网上游需求，可在受控前提下开启 `ssrf_allow_private_networks` 或把特定主机加入 `ssrf_allowed_hosts`。

::: warning
放开私有网段会扩大 SSRF 风险面。仅在你完全掌控网络环境、且确实需要时开启。
:::

## API 密钥侧的防护

每个 API 密钥可独立设置允许模型、允许用户渠道、允许 IP、额度上限，见 [管理 API 密钥](/guide/api-keys)。这是限制单个凭据爆炸半径的关键手段。

## 凭据与数据安全

- **JWT_SECRET**：生产环境必须为强随机值，否则服务拒绝启动；
- **上游渠道密钥 / 支付密钥 / SMTP 密码 / OIDC 密钥**：都存于数据库，注意 SQLite 文件与备份的访问控制；
- 这些敏感项只在管理员的 `GET /api/settings` 返回，不出现在 `GET /api/public/settings`；
- 数据模型中密码哈希、API 密钥哈希等字段都以哈希形式存储，不保存明文。

## 请求体大小

网关对单次请求体设有上限（默认 32 MiB），超限请求被拒，防止超大负载耗尽资源。
