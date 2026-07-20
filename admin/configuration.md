# 环境变量

平台的底层运行参数通过 `.env` 文件或系统环境变量配置。启动时加载 `.env`，但不会覆盖已存在的系统环境变量，因此容器或进程管理器传入的变量可覆盖文件配置。**业务配置**（站点、支付、签到、安全开关等）则存放在数据库，在后台界面修改，见 [站点设置](/admin/site-settings)。

## 变量清单

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `APP_ENV` | `development` | 运行环境：`development` / `local` / `test` / `staging` / `production`。非开发环境会强制要求安全的 `JWT_SECRET`。 |
| `PORT` | `8080` | HTTP 监听端口。 |
| `DB_DRIVER` | `sqlite` | 业务数据库驱动：`sqlite`、`postgres` / `postgresql`、`mysql` / `mariadb`。 |
| `DB_PATH` | `flai.db` | SQLite 数据库文件路径；执行 `--migrate` 时为迁移源。 |
| `DB_DSN` | 空 | PostgreSQL/MySQL 的连接字符串。未设置时读取 `DATABASE_URL`。SQLite 不使用此项。 |
| `DB_MAX_OPEN_CONNS` | `25` | PostgreSQL/MySQL 最大打开连接数，必须大于 0。SQLite 固定使用一个连接。 |
| `DB_MAX_IDLE_CONNS` | `10` | PostgreSQL/MySQL 最大空闲连接数；超过最大打开连接数时会自动收敛。 |
| `DB_CONN_MAX_LIFETIME_SECONDS` | `3600` | 连接最长存活秒数，`0` 表示不设置上限。 |
| `JWT_SECRET` | `change-me-please` | 后台会话 JWT 签名密钥。**生产环境必须改成安全随机值**，否则启动失败。 |
| `OIDC_ISSUER` | 空 | OIDC 身份提供商 issuer 地址。 |
| `OIDC_CLIENT_ID` | 空 | OIDC 客户端 ID。 |
| `OIDC_CLIENT_SECRET` | 空 | OIDC 客户端密钥。 |
| `OIDC_REDIRECT_URL` | 空 | OIDC 回调地址，需与提供商处登记一致，例如 `https://your-domain/auth/callback`。 |
| `BOOTSTRAP_ADMIN_EMAILS` | 空 | 逗号分隔的邮箱列表，命中者登录后自动成为管理员（不区分大小写）。 |
| `BOOTSTRAP_ADMIN_OIDC_SUBS` | 空 | 逗号分隔的 OIDC subject 列表，命中者自动成为管理员（区分大小写）。 |

## 数据库连接

默认 SQLite 只需设置 `DB_PATH`。使用 PostgreSQL 或 MySQL/MariaDB 时，将 `DB_DRIVER` 改为对应驱动，并设置 `DB_DSN`；`DATABASE_URL` 仅在 `DB_DSN` 为空时作为备用值。

```ini
# PostgreSQL
DB_DRIVER=postgres
DB_DSN=host=127.0.0.1 user=flai password=change-me dbname=flai port=5432 sslmode=disable

# MySQL / MariaDB
# DB_DRIVER=mysql
# DB_DSN=flai:change-me@tcp(127.0.0.1:3306)/flai?charset=utf8mb4&parseTime=True&loc=Local
```

已有 SQLite 数据迁移到新建的服务端数据库，请参阅[安装部署中的迁移步骤](/admin/installation#从-sqlite-迁移)。迁移目标必须为空，正常启动不会自动执行复制。

## Redis（可选）

Redis 连接可在后台“系统管理 > 系统设置 > Redis”中保存；保存后的连接在下次服务启动时生效。环境变量会覆盖后台保存的连接，适合容器和托管部署。

| 变量 | 说明 |
| --- | --- |
| `REDIS_ENABLED` | `true` 时启用 Redis；未设置时由后台开关决定。 |
| `REDIS_URL` | Redis URL，例如 `redis://:password@127.0.0.1:6379/0`。设置后优先于下面的单项连接参数。 |
| `REDIS_ADDR` | 地址，默认 `127.0.0.1:6379`。 |
| `REDIS_USERNAME` / `REDIS_PASSWORD` | Redis ACL 用户名和密码。 |
| `REDIS_DB` | 非负整数数据库编号，默认 `0`。 |
| `REDIS_TLS` | `true` 时使用 TLS。 |

```ini
REDIS_ENABLED=true
REDIS_URL=redis://:change-me@127.0.0.1:6379/0
```

Redis 用于按用户协调并发扣费，并保存已提交余额的镜像；数据库始终是唯一账本。Redis 未启用、连接失败或运行中不可用时，扣费会自动回退到原有的数据库原子更新，不会改为异步落库。

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
DB_DRIVER=postgres
DB_DSN=host=db user=flai password=******** dbname=flai port=5432 sslmode=require
JWT_SECRET=<openssl rand -hex 32 生成的强随机值>
OIDC_ISSUER=https://sso.example.com
OIDC_CLIENT_ID=veloce
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
| 运行参数 | `.env` / 环境变量 | 端口、数据库连接、JWT 密钥、OIDC 凭据 |
| 业务设置 | 数据库系统设置（后台界面） | 站点名、支付、签到、限流、敏感词、SMTP 等 |

OIDC 既可以用环境变量配置，也可以在后台系统设置里配置（`oidc_*` 键）。两者都存在时以平台实际读取逻辑为准——推荐统一在一处维护，避免混淆。
