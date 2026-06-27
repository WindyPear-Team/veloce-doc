# 公共控制台接口

这些接口用于控制台启动、主题加载、公开模型页、状态页、初始化流程。

## GET `/api/public/settings`

读取控制台公共设置。前端启动、登录页、布局、主题、状态页都会调用。

| 项 | 内容 |
| --- | --- |
| 鉴权 | 无 |
| Query | 无 |
| Body | 无 |
| 返回 | 公共设置对象。 |

返回字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `site_name` | string | 站点名称。 |
| `site_description` | string | 站点描述。 |
| `logo_url` | string | Logo URL。 |
| `favicon_url` | string | Favicon URL。 |
| `login_methods` | array | 可用登录方式，如 password、oidc、passkey。 |
| `registration_enabled` | boolean | 是否允许注册。 |
| `password_login_enabled` | boolean | 是否允许密码登录。 |
| `oidc_enabled` | boolean | 是否启用 OIDC。 |
| `passkey_enabled` | boolean | 是否启用 Passkey。 |
| `auth_agreement_required` | boolean | 登录/注册是否要求同意协议。 |
| `privacy_url` | string | 隐私政策地址。 |
| `terms_url` | string | 用户协议地址。 |
| `theme_*` | string | 主题相关颜色字段。 |
| `nav_items` | array | 自定义导航。 |
| `dashboard_widgets` | array | 仪表盘组件配置。 |
| `chat_page_mode` | string | 聊天页面模式。 |
| `pricing_endpoint_enabled` | boolean | 是否开放价格接口。 |
| `status_page_enabled` | boolean | 是否开放状态页。 |

## GET `/api/public/models`

公开模型目录。

| 项 | 内容 |
| --- | --- |
| 鉴权 | 无 |
| Query | 无 |
| Body | 无 |
| 返回 | 公开模型目录数组或对象。 |

返回包含模型名、供应商、图标、上下文、价格、`quota_type`、图片价格、视频计费配置等字段，供模型广场和价格页展示。

## GET `/api/public/status`

公开状态页数据。

| 项 | 内容 |
| --- | --- |
| 鉴权 | 无 |
| Query | 无 |
| Body | 无 |
| 返回 | 状态监控列表和最近检查结果。 |

## GET `/api/public/announcements`

公开公告列表。

| 项 | 内容 |
| --- | --- |
| 鉴权 | 无 |
| Query | 无 |
| Body | 无 |
| 返回 | 已启用公告列表。 |

返回字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 公告 ID。 |
| `title` | string | 标题。 |
| `content` | string | 内容。 |
| `sort_order` | number | 排序。 |
| `created_at` | string | 创建时间。 |

## GET `/api/pricing`

公开价格接口。

| 项 | 内容 |
| --- | --- |
| 鉴权 | 无 |
| Query | 无 |
| Body | 无 |
| 返回 | 模型价格、渠道价格、倍率后的有效价格。 |

如果系统未开启公开价格接口，会返回错误。

## GET `/api/setup/status`

查询是否需要初始化。

| 项 | 内容 |
| --- | --- |
| 鉴权 | 无 |
| Query | 无 |
| Body | 无 |
| 返回 | `{ "required": true }`。 |

## POST `/api/setup`

创建首个管理员。

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `site_name` | Body | string | 否 | 站点名称。 |
| `username` | Body | string | 是 | 管理员用户名。 |
| `email` | Body | string | 是 | 管理员邮箱。 |
| `password` | Body | string | 是 | 管理员密码。 |

返回：

```json
{
  "token": "jwt-token",
  "user": {}
}
```
