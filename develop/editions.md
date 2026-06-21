# 版本分层模型

项目分为**社区版（Community）**与**专业版（Premium）**两层，通过中立的扩展 Hook 解耦。

## 布局

```text
windypear-api/        私有专业版仓库
  go.mod              module github.com/WindyPear-Team/flai/premium
  main.go             注册专业版特性，然后启动社区版 app
  internal/premium/   专业版私有实现
  community/          公共社区版仓库，独立 Go 项目
    go.mod            module github.com/WindyPear-Team/flai
    main.go
    internal/
    web/
```

根模块通过 `replace` 依赖社区模块：

```go
replace github.com/WindyPear-Team/flai => ./community
```

社区模块暴露中立的扩展 Hook。如果没有任何专业版代码注册 Hook，它就作为社区版运行。根专业版模块导入社区版 app，并在启动前注册专业版的安全策略与特性。

## 设计原则

- **公共代码**放在 `community/`；
- **私有代码**放在 `community/` 之外；
- 专业版行为应通过社区版的扩展 Hook 接入，而不是从 `community/` 内部 import 私有代码；
- 私有仓库应把 `community/` 作为嵌套仓库或子模块跟踪，以便根构建时拥有公共核心。

## 入口对比

社区版入口 `community/main.go` 直接启动 app；专业版根 `main.go`：

```go
func main() {
    premium.Register()          // 注册所有 Hook
    if err := app.Run(); err != nil {
        log.Fatal(err)
    }
}
```

`premium.Register()` 会注册：版本标识、敏感词过滤、SSRF 防护、限流工厂、启动 Hook（订阅 / Meta Model）、管理与用户路由 Hook、计费 Hook、Meta Model 解析与目录 Hook。详见 [扩展点 Hooks](/develop/extension-hooks)。

## 日常命令

提交并推送社区版：

```powershell
cd community
git add -A
git commit -m "Update community"
git push
```

提交并推送专业版（根目录）：

```powershell
git add -A
git commit -m "Update premium"
git push
```

构建社区版：

```powershell
cd community
go build -buildvcs=false -o ..\dist\flai-community.exe .
```

构建专业版：

```powershell
go build -buildvcs=false -o dist\flai-premium.exe .
```

## 功能归属

| 能力 | 社区版 | 专业版 |
| --- | --- | --- |
| 网关、计费、认证、渠道/模型管理 | ✅ | ✅ |
| 签到、邀请、支付、状态监控 | ✅ | ✅ |
| Meta Model 路由 DSL | ❌ | ✅ |
| 订阅计费增强 | ❌ | ✅ |
| 完整敏感词过滤 / SSRF / 限流策略 | Hook 壳（基础/中立） | 完整实现 |

社区版在未注册 Hook 时，相关能力以中立或基础方式运行（例如计费走默认余额扣减、限流可能不强制）。
