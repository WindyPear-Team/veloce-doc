# 安装部署

平台是一个单一的 Go 二进制，前端构建产物会被内嵌进去，因此部署非常简单。

## 环境要求

- **Go**：版本以 `go.mod` 为准；
- **Node.js** 与 **Yarn**（构建前端用，Yarn 4.x）；
- 运行时目前只能使用 **SQLite**，无需额外数据库服务。

## 从源码构建

### 1. 构建前端

```bash
cd community/web   # 或仓库内 web/ 目录
yarn install
yarn build
```

前端构建产物会被后端内嵌并在运行时作为静态资源提供。

### 2. 构建后端

```bash
cd community
go build -buildvcs=false -o ../dist/flai-community.exe .
```

或开发时直接运行：

```bash
go run .
```

::: tip 顺序
务必**先构建前端再构建后端**，否则内嵌的前端资源会是空的。
:::

## 配置

复制 `.env.example` 为 `.env` 并填写：

```bash
cp .env.example .env
```

```ini
APP_ENV=development        # development / local / test / staging / production
PORT=8080
DB_PATH=flai.db
JWT_SECRET=your-secure-jwt-secret-here
OIDC_ISSUER=https://your-oidc-provider.com
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret
OIDC_REDIRECT_URL=http://localhost:8080/auth/callback
BOOTSTRAP_ADMIN_OIDC_SUBS=
BOOTSTRAP_ADMIN_EMAILS=
```

每一项的含义见 [环境变量](/admin/configuration)。

::: warning 生产环境
在非开发环境（`staging` / `production` 等）下，`JWT_SECRET` 必须改为安全的随机值，否则服务会拒绝启动。
:::

## 运行

```bash
./dist/flai-community.exe
```

启动后访问 `http://localhost:8080`：

- 首次访问会进入 [初始化设置](/admin/initial-setup) 创建管理员；
- 健康检查：`GET /health`。

## 反向代理与 HTTPS

生产部署建议在前面放一层反向代理（Nginx / Caddy 等）负责 TLS 终止，并把真实客户端 IP 透传给后端（影响 API 密钥的 IP 限制与限流）。把 `OIDC_REDIRECT_URL`、支付回调地址、站点 `base_url` 都设置为对外的 HTTPS 域名。

## 数据与备份

默认数据存储在 `DB_PATH` 指向的 SQLite 文件（如 `flai.db`）。定期备份该文件即可备份全部业务数据。迁移到其他机器时连同该文件一起迁移。
