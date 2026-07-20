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
go build -buildvcs=false -ldflags "-X github.com/WindyPear-Team/veloce/internal/service.BuildVersion=v1.2.3" -o ../dist/flai-community.exe .
```

专业版（根目录，含 `premium.Register()`）：

```bash
go build -buildvcs=false -o dist/flai-premium.exe .
```

`-buildvcs=false` 避免在无 VCS 信息或子模块场景下的构建报错。发布构建的 `BuildVersion` 必须替换为本次 Release 的 tag，例如 `v1.2.3`；自动更新功能依靠它判断是否有新版本。非 Windows 平台去掉 `.exe` 后缀即可。

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

## GitHub Release

向社区版仓库推送 `v1.2.3` 这样的语义化版本标签会触发 `Release Community` 工作流。工作流会：

1. 检出社区版和前端仓库的同名标签；
2. 为 Linux、macOS、Windows 的 `amd64` 与 `arm64` 构建发布包；
3. 使用链接器把标签注入 `github.com/WindyPear-Team/veloce/internal/service.BuildVersion`；
4. 将每个平台对应的压缩包上传到 GitHub Release。

前端仓库必须预先存在同名标签。手动构建如未设置 `BuildVersion`，默认会是 `dev`，不能使用应用内自动更新。

## 发布清单

发布前建议确认：

- [ ] 前端已 `yarn build` 且为最新；
- [ ] 后端编译通过、`go test ./...` 通过；
- [ ] `.env` / 环境变量在目标环境配置正确（`APP_ENV`、`JWT_SECRET`、数据库连接、OIDC、`base_url`）；
- [ ] 反向代理与 HTTPS、真实客户端 IP 透传就绪；
- [ ] 支付/状态监控所需的对外回调地址可达；
- [ ] 业务数据库有备份策略；
- [ ] 三个子仓库（community / web / docs）已分别提交、推送，父仓库子模块引用已更新。

## 子仓库提交

```powershell
# 社区版
cd community
git add -A; git commit -m "Update community"; git push
```

## 文档站点构建

本文档本身是 VitePress 站点（位于 `docs/`）：

```bash
cd docs
npm install
npm run dev      # 本地预览
npm run build    # 构建静态站点到 .vitepress/dist
```

实际脚本名以 `docs/package.json` 为准（`dev` / `build` / `preview`）。
