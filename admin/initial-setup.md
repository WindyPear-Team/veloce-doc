# 初始化设置

全新部署、数据库里还没有任何账户时，平台进入**初始化设置**流程，用于创建第一位管理员。

## 流程

1. 启动服务后访问站点首页；
2. 前端会调用 `GET /api/setup/status` 检查是否需要初始化；
3. 若 `required` 为 `true`，进入设置向导页面（`Setup`）；
4. 填写并提交：
   - **站点名称（site_name）**
   - **用户名（username）**
   - **邮箱（email）**
   - **密码（password）**
5. 提交后调用 `POST /api/setup`，创建首位**管理员**账户并直接返回登录态（JWT）。

## 接口

```http
POST /api/setup
Content-Type: application/json

{
  "site_name": "My AI Platform",
  "username": "admin",
  "email": "admin@example.com",
  "password": "a-strong-password"
}
```

成功返回：

```json
{ "token": "<jwt>", "user": { "...": "..." } }
```

## 行为与约束

- 该接口**只能成功执行一次**。初始化完成后再次调用返回 `409 Initial setup is already complete`；
- 提交的字段会做校验，非法输入返回 `400`；
- 站点名称会写入系统设置 `site_name`，之后可在 [站点设置](/admin/site-settings) 修改；
- 创建的账户自动具备管理员权限。

## 与引导管理员的关系

除了初始化向导，你也可以通过环境变量在登录时自动提升管理员：

```ini
BOOTSTRAP_ADMIN_EMAILS=admin@example.com,ops@example.com
BOOTSTRAP_ADMIN_OIDC_SUBS=oidc-subject-1,oidc-subject-2
```

命中其中任一邮箱（不区分大小写）或 OIDC subject（区分大小写）的用户，登录后会被自动设为管理员。这在你想用 OIDC 直接登录而不走密码初始化时很有用。

::: tip
如果你打算只用 OIDC 登录管理员账户，可以先配好 OIDC 与 `BOOTSTRAP_ADMIN_*`，然后用 OIDC 登录，首位登录用户即成为管理员——此时仍需确保数据库为空以触发正常引导。
:::
