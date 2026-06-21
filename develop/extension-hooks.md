# 扩展点 Hooks

社区版通过一组**中立扩展 Hook** 把可选/高级能力解耦出去。专业版在启动前注册这些 Hook 来注入实现，而社区核心完全不依赖专业版代码。本页是这些 Hook 的开发参考，定义见 `community/internal/service/hooks.go`、`edition.go`、`content_filter_community.go`、`url_guard_community.go`，限流见 `internal/middleware/rate_limit_community.go`。

## 设计原则

- 社区核心只定义 Hook 接口与 `Register*` 函数；
- 未注册时，能力以**中立/基础行为**运行（如默认余额扣减、限流可能不强制、SSRF 走基础校验）；
- 专业版在 `premium.Register()` 中注册全部 Hook，且只能从 `community/` 之外 import 私有实现。

## Hook 一览

### 版本标识

```go
service.RegisterEditionProvider(func() string { return "premium" })
// CurrentEdition() 默认返回 "community"
```

### 启动 Hook

```go
type StartupHook func() error
service.RegisterStartupHook(hook)   // 在 app.Run() 中 model.InitDB() 后执行
```

专业版用它初始化订阅、Meta Model 等。任一 Hook 返回 error 会中断启动。

### 路由 Hook

```go
type RouteHook func(*gin.RouterGroup)
service.RegisterAdminRouteHook(hook)  // 追加到 /api（管理员）
service.RegisterUserRouteHook(hook)   // 追加到 /api/user（本人）
```

在已有鉴权分组上追加新接口（如 Meta Model 管理路由），无需改社区核心的路由表。

### 计费 Hook

```go
type UsageChargeHook func(tx *gorm.DB, userID uint, cost decimal.Decimal) error
service.RegisterUsageChargeHook(hook)
```

`ApplyUsageCharge` 在计费事务中调用。未注册时走默认实现：

```go
UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?
// RowsAffected == 0 → ErrInsufficientBalance
```

专业版可用它实现订阅额度优先扣减等逻辑。

### Meta Model Hook

```go
service.RegisterMetaModelHooks(listHook, resolveHook)
service.RegisterMetaModelCatalogHook(catalogHook)
```

- `MetaModelListHook`：把 Meta Model 名加入 `/v1/models`；
- `MetaModelResolveHook`：请求命中 Meta Model 时解析 DSL，返回真实模型、计费模式、是否跳过密钥模型校验等（`MetaModelResolveResult`）；
- `MetaModelCatalogHook`：把 Meta Model 加入公开目录（`MetaModelCatalogItem`，含计费模式、价格、引用的真实模型）。

详见 [Meta Model DSL](/develop/meta-model-dsl)。

### 敏感词过滤 Hook

```go
service.RegisterSensitiveFilterHooks(service.SensitiveFilterHooks{
    Enabled:    func() bool { ... },
    Scope:      func() string { ... },   // request / request_response
    MatchWords: func(text string) (SensitiveWordMatch, bool) { ... },
    Words:      func() []string { ... },
})
```

社区壳定义了 scope 常量与开关读取，专业版注入真正的匹配逻辑与词库。

### SSRF / URL 防护 Hook

```go
service.RegisterURLGuardHooks(service.URLGuardHooks{
    ValidateConfiguredHTTPURL:    ...,
    ValidateConfiguredTCPAddress: ...,
    ValidateConfiguredStatus:     ...,
    ValidateOutboundHTTPURL:      ...,
    CurrentOptions:               ...,
    Enabled:                      ...,
})
```

社区暴露 `ValidateConfiguredHTTPURL` / `ValidateConfiguredTCPAddress` / `ValidateConfiguredStatusTarget` / `ValidateOutboundHTTPURL`，在校验渠道地址、状态监控目标、出站请求时调用。

### 限流工厂

```go
middleware.RegisterRateLimiterFactory(func() gin.HandlerFunc { ... })
// NewRateLimiter() 无工厂时返回空处理器（不强制限流）
```

## 注册顺序（专业版示例）

`internal/premium/register.go` 的 `Register()`：

```go
func Register() {
    communityservice.RegisterEditionProvider(func() string { return "premium" })
    communityservice.RegisterSensitiveFilterHooks(...)
    communityservice.RegisterURLGuardHooks(...)
    communitymiddleware.RegisterRateLimiterFactory(newRateLimiterMiddleware)
    communityservice.RegisterStartupHook(initSubscriptionFeatures)
    communityservice.RegisterStartupHook(initMetaModelFeatures)
    communityservice.RegisterAdminRouteHook(registerSubscriptionAdminRoutes)
    communityservice.RegisterAdminRouteHook(registerMetaModelAdminRoutes)
    communityservice.RegisterUserRouteHook(registerSubscriptionUserRoutes)
    communityservice.RegisterUsageChargeHook(applySubscriptionUsageCharge)
    communityservice.RegisterMetaModelHooks(listMetaModelNames, resolveMetaModel)
    communityservice.RegisterMetaModelCatalogHook(listMetaModelCatalog)
}
```

`main.go` 在 `app.Run()` 之前调用它，因此所有 Hook 在启动 Hook 执行和服务监听之前就绪。

## 自定义扩展建议

如果你要做自己的扩展（而非专业版）：

1. 新建一个独立模块/包，import 社区版；
2. 在 `main()` 调 `app.Run()` 之前注册所需 Hook；
3. 不要修改 `community/` 内部，保持核心可独立升级。
