# 公开接口

公开接口不需要鉴权。

## 端点

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/health` | 无 | 无 | `{ "status": "ok" }` |
| `GET` | `/api/public/settings` | 无 | 无 | 公开站点设置，如站点名称、主题、登录方式、注册开关、公开页面配置。 |
| `GET` | `/api/public/models` | 无 | 无 | 公开模型目录，包含模型、供应商、价格、能力和视频计费配置。 |
| `GET` | `/api/public/status` | 无 | 无 | 状态页监控项和最近检查结果。 |
| `GET` | `/api/public/announcements` | 无 | 无 | 启用状态的公告列表。 |
| `GET` | `/api/pricing` | 无 | 无 | 公开价格表；如果系统关闭公开价格接口会返回错误。 |
| `GET` | `/api/setup/status` | 无 | 无 | `{ "required": true }`，表示是否需要初始化首个管理员。 |
| `POST` | `/api/setup` | 无 | `site_name`、`username`、`email`、`password` | `{ "token": "...", "user": { ... } }` |

## 初始化管理员

请求：

```json
{
  "site_name": "Veloce",
  "username": "admin",
  "email": "admin@example.com",
  "password": "change-me"
}
```

返回：

```json
{
  "token": "jwt-token",
  "user": {}
}
```

错误：

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `409` | 初始化已完成。 |
| `500` | 初始化失败。 |
