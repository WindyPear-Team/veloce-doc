# 签到与邀请返佣

两项可选的运营增长功能，鼓励用户活跃与拉新。用户侧说明见 [签到与邀请](/guide/checkin-and-referral)。

## 每日签到

由 `checkin_enabled` 开关控制，奖励直接进入用户余额。支持三种可叠加的奖励模式。

### 设置项

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `checkin_enabled` | `false` | 总开关 |
| `checkin_daily_reward` | `0` | 每日固定奖励金额 |
| `checkin_timezone` | `Asia/Shanghai` | 判定「一天」的时区 |
| `checkin_streak_enabled` | `false` | 连续签到奖励开关 |
| `checkin_streak_cycle_days` | `7` | 连续签到周期（天） |
| `checkin_streak_rewards` | `{}` | 各连续档位的奖励配置（JSON） |
| `checkin_random_enabled` | `false` | 随机奖励开关 |
| `checkin_random_min` | `0` | 随机奖励下限 |
| `checkin_random_max` | `0` | 随机奖励上限 |

### 行为

- 每个用户每天（按 `checkin_timezone` 划分）最多签到一次；
- **连续签到**：连续天数累加，达到周期档位发放对应奖励；中断后连续天数重置为 1；
- **随机奖励**：在 `[min, max]` 间随机；
- 签到产生一条 `CheckInRecord`，记录奖励金额、连续天数与奖励类型。

### 相关接口

| 操作 | 接口 |
| --- | --- |
| 签到状态（今日可签、连续天数、奖励预览） | `GET /api/user/check-in/status` |
| 签到记录 | `GET /api/user/check-in/records` |
| 领取签到 | `POST /api/user/check-in` |

## 邀请返佣

由 `referral_enabled` 控制。被邀请人消费时，按比例返佣给邀请人。

### 设置项

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `referral_enabled` | `false` | 总开关 |
| `referral_commission_rate` | `0` | 返佣比例（如 `0.1` 表示 10%） |

### 行为

- 每个用户有唯一 `referral_code`；
- 新用户通过邀请链接注册时，其 `referrer_id` 指向邀请人，关系在注册时确定且不可更改；
- 被邀请人每笔消费按 `referral_commission_rate` 计算返佣，**额外**发放到邀请人余额，不影响被邀请人本次扣费；
- 每笔返佣记录为 `ReferralCommissionLog`，关联触发消费的日志。

### 相关接口

| 操作 | 接口 |
| --- | --- |
| 用户查看自己的邀请信息 | `GET /api/user/referral` |
| 管理员查看全部返佣明细 | `GET /api/referral-commissions` |

::: tip 防刷建议
开启返佣时，结合邮箱验证、hCaptcha、IP 限制等手段降低批量注册薅羊毛的风险，见 [安全与防护](/admin/security)。返佣比例不宜过高。
:::
