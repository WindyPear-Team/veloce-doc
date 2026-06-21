# 环境变量

平台的底层运行参数通过 `.env` 文件或系统环境变量配置（启动时用 `godotenv` 加载 `.env`，缺失时回退到系统环境变量）。**业务配置**（站点、支付、签到、安全开关等）则存放在数据库的系统设置里，在后台界面修改，见 [站点设置](/admin/site-settings)。

## 变量清单

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `APP_ENV` | `development` | 运行环境：`development` / `local` / `test` / `staging` / `production`。非开发环境会强制要求安全的 `JWT_SECRET`。 |
| `PORT` | `8080` | HTTP 监听端口。 |
| `DB_PATH` | `flai.db` | SQLite 数据库文件路径。 |
| `JWT_SECRET` | `change-me-please` | 后台会话 JWT 签名密钥。**生产环境必须改成安全随机值**，否则启动失败。 |
| `OIDC_ISSUER` | 空 | OIDC 身份提供商 issuer 地址。 |
| `OIDC_CLIENT_ID` | 空 | OIDC 客户端 ID。 |
| `OIDC_CLIENT_SECRET` | 空 | OIDC 客户端密钥。 |
| `OIDC_REDIRECT_URL` | 空 | OIDC 回调地址，需与提供商处登记一致，例如 `https://your-domain/auth/callback`。 |
| `BOOTSTRAP_ADMIN_EMAILS` | 空 | 逗号分隔的邮箱列表，命中者登录后自动成为管理员（不区分大小写）。 |
| `BOOTSTRAP_ADMIN_OIDC_SUBS` | 空 | 逗号分隔的 OIDC subject 列表，命中者自动成为管理员（区分大小写）。 |

## 环境判定

以下环境被视为「开发类」，会放宽安全校验（如允许默认 `JWT_SECRET`）：

```
（空）、development、dev、local、test
```

其余值（如 `staging`、`production`）被视为生产类，会强制安全要求。

## 示例

开发环境 `.env`：

```ini
APP_ENV=development
PORT=8080
DB_PATH=flai.db
JWT_SECRET=dev-only-secret
```

生产环境 `.env`：

```ini
APP_ENV=production
PORT=8080
DB_PATH=/data/flai.db
JWT_SECRET=<openssl rand -hex 32 生成的强随机值>
OIDC_ISSUER=https://sso.example.com
OIDC_CLIENT_ID=token-market
OIDC_CLIENT_SECRET=********
OIDC_REDIRECT_URL=https://api.example.com/auth/callback
BOOTSTRAP_ADMIN_EMAILS=admin@example.com
```

::: tip 生成强密钥
```bash
openssl rand -hex 32
```
:::

## 配置项放在哪里

| 类型 | 位置 | 例子 |
| --- | --- | --- |
| 运行参数 | `.env` / 环境变量 | 端口、数据库路径、JWT 密钥、OIDC 凭据 |
| 业务设置 | 数据库系统设置（后台界面） | 站点名、支付、签到、限流、敏感词、SMTP 等 |

OIDC 既可以用环境变量配置，也可以在后台系统设置里配置（`oidc_*` 键）。两者都存在时以平台实际读取逻辑为准——推荐统一在一处维护，避免混淆。
