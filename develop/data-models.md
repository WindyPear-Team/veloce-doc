# 数据模型

后端使用 GORM，支持 SQLite、PostgreSQL 与 MySQL/MariaDB；启动时对所有模型执行 `AutoMigrate`（见 `internal/model/db.go`）。本页按领域归纳核心模型与关键关系。

## 实体关系概览

```
User ──< APIKey
User ──< UserGroupMembership >── Group
User ──< TokenLog
User ──< PaymentOrder
User ──< CheckInRecord
User ──< ReferralCommissionLog        (referrer)
User ──  User                         (Referrer 自引用)
User ──< PasskeyCredential

UserChannel ──< Channel ──< ModelConfig >── Model
Channel ──< ChannelGroupMultiplier >── Group
ModelConfig ──< ModelGroupMultiplier >── Group

StatusMonitor ──< StatusCheck

PersonalCompany ──< CompanyCharterRevision
PersonalCompany ──< CompanyObjective ──< CompanyWorkItem ──< CompanyWorkAttempt
CompanyWorkItem ──< CompanyArtifact / CompanyHandoffPackage / CompanyApprovalRequest

Organization ──< OrganizationMember >── User
Organization ──< Department / Workspace / Role / EnterpriseTask / QuotaAccount
```

## 账户与认证

### User

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | uint | 主键 |
| `username` / `email` | string | 唯一标识 |
| `oidc_sub` | *string | 绑定的 OIDC subject，唯一 |
| `password_hash` | string | 密码哈希（JSON 不输出） |
| `email_verified` | bool | 邮箱是否验证 |
| `balance` | decimal(20,6) | 余额 |
| `group_id` / `group` | uint / Group | 主分组 |
| `groups` | []UserGroupMembership | 多分组成员关系 |
| `api_key` | string | 兼容字段（不输出） |
| `referral_code` | *string | 邀请码，唯一 |
| `referrer_id` / `referrer` | *uint / *User | 邀请人 |
| `is_admin` | bool | 是否管理员 |

### APIKey

| 字段 | 说明 |
| --- | --- |
| `user_id` | 所属用户 |
| `name` | 名称 |
| `key_hash` / `key_prefix` | 密钥哈希与前缀（不存明文） |
| `allowed_models` | 允许模型（文本） |
| `allowed_user_channels` | 允许用户渠道（文本） |
| `allowed_ips` | 允许 IP（文本） |
| `quota_limit` | decimal(20,10) 额度上限 |
| `enabled` | 是否启用 |

### 认证辅助

- **EmailVerificationCode**：邮箱验证码（哈希、用途、过期时间）；
- **OIDCBindRequest**：OIDC 绑定请求（state、过期）；
- **WebAuthnChallenge**：WebAuthn 挑战（challenge、用途、RPID、Origin、过期）；
- **PasskeyCredential**：Passkey 凭据（credential_id、public_key_cose 等）。

## 供给与路由

### UserChannel

`name`、`description`、`multiplier`、`routing_algorithm`（默认 `priority`）、`enabled`，下挂多个 `Channel`。

### Channel

`name`、`type`（`openai`/`claude`）、`base_url`、`api_key`（上游密钥）、`multiplier`、`priority`、`weight`、`enabled`、`user_channel_id`，含 `ModelConfig` 与 `ChannelGroupMultiplier`。

### Model（全局模型）

| 字段组 | 说明 |
| --- | --- |
| `model_name` | 对外模型名，唯一 |
| `provider` / `provider_icon_url` | 供应商与图标 |
| `input_price` / `output_price` / `cached_input_price` | 基础分项价（每 1M token） |
| `cache_write_input_price` / `cache_write_1h_input_price` | 缓存写入价 |
| `image_input_price` / `image_output_price` | 图像价 |
| `audio_input_price` / `audio_output_price` | 音频价 |
| `*_price_tiers` | 各项对应阶梯价（`PriceTierList`，文本 JSON） |
| `enabled` | 是否启用 |

### ModelConfig（模型×渠道绑定）

`channel_id`、`model_id`、`upstream_model_name`（上游真实名）、`enabled`，含 `ModelGroupMultiplier`。另有 `input_price`/`output_price` 为遗留字段。

## 计费与运营

### 倍率

- **Group**：`name`、`multiplier`（默认 1）；
- **UserGroupMembership**：用户-分组关系，可带 `expires_at`；
- **ChannelGroupMultiplier**：渠道×分组倍率；
- **ModelGroupMultiplier**：模型配置×分组倍率。

倍率合并与覆盖优先级见 [分组与倍率](/admin/groups-and-multipliers)。

### TokenLog

每次请求一条，记录 `user_id`、`api_key_id`、`user_channel_id`、`channel_id`、`model_name`，以及各维度 token 数（输入/输出/缓存输入/缓存写入/1h缓存写入/图像/音频）与费用。

### PaymentOrder

`order_no`（唯一）、`user_id`、`amount`、`rmb_amount`、`exchange_rate`、`method`、`status`、`gateway_provider`、`gateway_trade_no`、`notify_payload`。

### CheckInRecord

`user_id` + `check_in_date`（唯一组合）、`reward_amount`、`streak_days`、`reward_kind`。

### ReferralCommissionLog

记录邀请返佣，关联触发消费与受益邀请人。

## 工作室运营

### PersonalCompany

`PersonalCompany` 是用户拥有的工作室运营边界，不复用企业 `Organization`、成员关系或 RBAC。它关联一个 Agent Studio，并保存当前状态、时区、自主等级、每日/月度预算、余额下限、运行环境和最大并发工作数。

`CompanyCharterRevision` 是不可变的章程版本；当前生效版本由 `PersonalCompany.charter_revision_id` 指向。章程包含使命、目标、数据边界、禁止动作和审批策略。

### 目标、工作与治理

- `CompanyObjective`：工作室目标，含状态、优先级和目标日期；
- `CompanyWorkItem`：持久化交付承诺，记录验收条件、风险、分配、额度预留与实际消耗；
- `CompanyWorkAttempt`：一次执行或复核尝试，与工作项分离，以支持重试与恢复而不覆盖原承诺；
- `CompanyArtifact` / `CompanyHandoffPackage`：工作产物和成员间交接；
- `CompanyApprovalRequest`：需要所有者决定的审批；
- `CompanyBudgetLedger` / `CompanyAuditEvent`：预算流水与审计事件。

工作室成员、角色模板、成员版本、能力证据和招聘计划由 `PersonalCompanyEmployee`、`CompanyRoleTemplate`、`CompanyEmployeeVersion`、`CompanyCapabilityEvidence`、`CompanyRecruitmentPlan` 记录。

## 企业模式

企业模式下，一个部署对应一个 `Organization`，用户通过 `OrganizationMember` 加入其中，并拥有个人 `Workspace`。`Department`、`Role`、`RolePermission`、`RoleBinding` 和 `DepartmentRoleBinding` 组成企业 RBAC 与部门授权关系。

`EnterpriseTask` 及其分配、部门关联和共享资源模型保存企业工作协作；`QuotaAccount` 与 `QuotaLedger` 保存组织、成员、任务和资源池范围内的额度流水。

## 内容与配置

- **StatusMonitor / StatusCheck**：状态监控项与每次探测结果，见 [公告与状态页](/admin/announcements-status)；
- **Announcement**：公告（`title`、`content`、`enabled`、`sort_order`）；
- **SystemSetting**：键值对配置，`key` 为主键，业务设置都存于此，见 [站点设置](/admin/site-settings)。

## 迁移注意

- `AutoMigrate` 在启动时自动建表/补列，但**不会删列或破坏性变更**；
- 引入新缓存价字段时，迁移逻辑会用历史 `input_price` 回填新列（仅首次、当新列不存在时），避免老数据缓存价为 0；
- 改动模型字段时注意向后兼容，避免影响既有数据库及跨驱动部署。
