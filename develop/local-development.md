# 本地开发

本页帮助贡献者在本地把项目跑起来并开始改代码。

## 前置依赖

- **Go**（版本以 `go.mod` 为准）
- **Node.js** 与 **Yarn**（4.x，前端用）
- Git（社区版/前端为子模块）

## 获取代码

```bash
git clone <repo-url> windypear-api
cd windypear-api
git submodule update --init --recursive   # 拉取 community/ 与 web/
```

## 配置环境

```bash
cp .env.example .env
```

开发环境最小配置即可（`APP_ENV=development` 时允许默认 JWT 密钥）：

```ini
APP_ENV=development
PORT=8080
DB_PATH=flai.db
JWT_SECRET=dev-only-secret
```

变量含义见 [环境变量](/admin/configuration)。

## 前端开发

```bash
cd web        # 或 community/web
yarn install
yarn dev      # Vite 开发服务器，带热更新
```

`yarn dev` 启动独立的前端开发服务器（默认带 `--host`）。开发时让它代理到后端 `:8080`，或直接连后端地址调试 API。

构建产物（生产）：

```bash
yarn build    # tsc -b && vite build
```

## 后端开发

开发时直接运行（社区版）：

```bash
cd community
go run .
```

或运行专业版（在根目录，会先 `premium.Register()`）：

```bash
go run .
```

::: warning 内嵌前端
后端通过 `embed` 内嵌前端 `dist`。如果你只跑后端而没先 `yarn build`，内嵌资源可能为空——此时用 `yarn dev` 单独跑前端，后端只当 API 服务用即可。要验证内嵌效果，先 `yarn build` 再起后端。
:::

## 首次启动

后端起来后访问 `http://localhost:8080`，进入 [初始化设置](/admin/initial-setup) 创建管理员。数据写入 `DB_PATH` 指定的 SQLite 文件。

## 测试

后端含单元测试，例如：

```bash
cd community
go test ./...
```

已有测试覆盖 `api_key`、`passkey`、`proxy`、`sync`、`content_filter` 等（见 `*_test.go`）。改动相关逻辑时请补充/运行测试。

## 常见工作流

| 任务 | 在哪改 |
| --- | --- |
| 新增网关行为 / 路由 | `community/internal/app/app.go` + `internal/service/proxy.go` |
| 新增管理接口 | `community/internal/api/*.go` + 在 `app.go` 注册 |
| 改数据模型 | `community/internal/model/models.go`（注意 AutoMigrate 兼容） |
| 调整计费 | `community/internal/service/billing.go` |
| 前端页面 | `web/src/pages/*.tsx` |
| 前端 API 调用 | `web/src/lib/api.ts` |
| 专业版特性 | `internal/premium/*`，通过 Hook 接入 |

## 提交到正确的仓库

`community/`、`web/`、`docs/` 都是独立 git 仓库。改了哪个就在哪个目录提交、推送，再在父仓库更新子模块引用。详见 [版本分层模型](/develop/editions)。
