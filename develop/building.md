# 构建与发布

本页说明如何构建社区版与专业版二进制，以及发布注意事项。

## 构建顺序

务必**先构建前端，再构建后端**。后端通过 `embed` 内嵌前端 `dist`，前端没构建时内嵌资源为空。

### 1. 构建前端

```bash
cd web        # 或 community/web
yarn install
yarn build    # tsc -b && vite build
```

产物输出到前端 `dist/`，由后端嵌入。

### 2. 构建后端

社区版（独立可运行）：

```bash
cd community
go build -buildvcs=false -o ../dist/flai-community.exe .
```

专业版（根目录，含 `premium.Register()`）：

```bash
go build -buildvcs=false -o dist/flai-premium.exe .
```

`-buildvcs=false` 避免在无 VCS 信息或子模块场景下的构建报错。非 Windows 平台去掉 `.exe` 后缀即可。

## 交叉编译

Go 支持交叉编译，例如为 Linux amd64 构建：

```bash
# bash
GOOS=linux GOARCH=amd64 go build -buildvcs=false -o dist/flai-linux .
```

```powershell
# PowerShell
$env:GOOS="linux"; $env:GOARCH="amd64"
go build -buildvcs=false -o dist/flai-linux .
```

前端是纯静态资源，与目标平台无关，构建一次即可被任意平台的后端内嵌。

## 运行产物

```bash
./dist/flai-community.exe
```

确保同目录或环境中有正确的 `.env`（或系统环境变量）。生产环境务必设置安全的 `JWT_SECRET`，否则启动失败。详见 [安装部署](/admin/installation)。

## 发布清单

发布前建议确认：

- [ ] 前端已 `yarn build` 且为最新；
- [ ] 后端编译通过、`go test ./...` 通过；
- [ ] `.env` / 环境变量在目标环境配置正确（`APP_ENV`、`JWT_SECRET`、`DB_PATH`、OIDC、`base_url`）；
- [ ] 反向代理与 HTTPS、真实客户端 IP 透传就绪；
- [ ] 支付/状态监控所需的对外回调地址可达；
- [ ] SQLite 数据文件有备份策略；
- [ ] 三个子仓库（community / web / docs）已分别提交、推送，父仓库子模块引用已更新。

## 子仓库提交

```powershell
# 社区版
cd community
git add -A; git commit -m "Update community"; git push

# 专业版（根目录）
git add -A; git commit -m "Update premium"; git push
```

`web/` 与 `docs/` 同理，在各自目录内提交。详见 [版本分层模型](/develop/editions)。

## 文档站点构建

本文档本身是 VitePress 站点（位于 `docs/site/`）：

```bash
cd docs/site
npm install
npm run docs:dev      # 本地预览
npm run docs:build    # 构建静态站点到 .vitepress/dist
```

> 实际脚本名以 `docs/site/package.json` 为准（`dev` / `build` / `preview`）。
