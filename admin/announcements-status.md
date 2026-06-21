# 公告与状态页

两项面向用户的信息展示功能：**公告**用于发布通知，**状态监控**用于展示服务可用性。

## 公告（Announcements）

在仪表盘等位置向用户展示的通知。

### 字段

| 字段 | 说明 |
| --- | --- |
| `title` | 标题 |
| `content` | 内容（文本） |
| `enabled` | 是否展示 |
| `sort_order` | 排序，数值小的靠前 |

### 接口

| 操作 | 接口 |
| --- | --- |
| 公开列表（用户可见的已启用公告） | `GET /api/public/announcements` |
| 管理列表 | `GET /api/announcements` |
| 创建 | `POST /api/announcements` |
| 更新 | `PUT /api/announcements/:id` |
| 删除 | `DELETE /api/announcements/:id` |

此外系统设置里还有一个单独的 `announcement` 字段，用于站点级横幅式公告（见 [站点设置](/admin/site-settings)）。两者可配合使用：横幅放最重要的一句话，公告列表放详细条目。

## 状态监控（Status Monitor）

由 `status_monitor_enabled` 控制，开启后平台会定期探测配置的目标并在公开状态页展示可用性与延迟。

### 监控项字段

| 字段 | 默认 | 说明 |
| --- | --- | --- |
| `name` | — | 监控项名称 |
| `target_url` | — | 探测目标地址 |
| `check_type` | `http` | 探测类型 |
| `method` | `GET` | HTTP 方法 |
| `interval_seconds` | `60` | 探测间隔（秒） |
| `retention_hours` | `168` | 历史记录保留时长（小时，默认 7 天） |
| `enabled` | `true` | 是否启用 |

每次探测生成一条 `StatusCheck`（状态、延迟、状态码、消息），监控项上会缓存最近一次结果。

### 接口

| 操作 | 接口 |
| --- | --- |
| 公开状态（含可用率） | `GET /api/public/status` |
| 管理列表 | `GET /api/status-monitors` |
| 创建 | `POST /api/status-monitors` |
| 更新 | `PUT /api/status-monitors/:id` |
| 删除 | `DELETE /api/status-monitors/:id` |
| 立即检查 | `POST /api/status-monitors/:id/check` |

公开状态页会按保留窗口计算并展示**可用率（uptime）**。

::: tip 探测对象
可以监控自己的网关入口、上游供应商地址、依赖的第三方服务等。把探测间隔设得过小会增加负载与对目标的压力，按需权衡（默认 60 秒通常足够）。
:::

侧边栏里状态页等入口的显隐由 `sidebar_*` 设置控制，见 [站点设置](/admin/site-settings)。
