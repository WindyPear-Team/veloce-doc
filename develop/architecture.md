# 系统架构

本页给出 Veloce 的整体架构与请求生命周期，帮助贡献者快速建立心智模型。

## 总览

```
┌──────────────────────────────────────────────────────────────┐
│                         客户端 / SDK                            │
│         OpenAI SDK · Claude SDK · Gemini SDK · cURL             │
└───────────────────────────────┬──────────────────────────────┘
                                 │ HTTP（含 sk- 密钥）
┌───────────────────────────────▼──────────────────────────────┐
│                      Go 后端（单一二进制）                       │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐  │
│  │ Gin 路由      │  │ 中间件         │  │ 内嵌前端（embed）   │  │
│  │ /v1 /v1beta  │  │ Auth/限流/体积 │  │ React SPA 静态资源  │  │
│  │ /auth /api   │  └───────────────┘  └────────────────────┘  │
│  ├──────────────┴───────────────────────────────────────────┐ │
│  │ Service 层                                                 │ │
│  │  proxy（路由+转换+计费） auth billing sync status providers │ │
│  │  hooks（扩展点） content_filter url_guard ...               │ │
│  ├────────────────────────────────────────────────────────┐ │ │
│  │ Model 层（GORM）  →  SQLite                               │ │ │
│  └────────────────────────────────────────────────────────┘ │ │
└──────────────────────────────┬───────────────────────────────┘
                               │ 转发（OpenAI / Claude 协议）
┌──────────────────────────────▼───────────────────────────────┐
│              上游 AI 供应商（多渠道，多用户渠道）                  │
└───────────────────────────────────────────────────────────────┘
```

## 分层

| 层 | 目录 | 职责 |
| --- | --- | --- |
| 入口 | `internal/app` | 组装路由、中间件、服务，启动 HTTP server |
| 路由/处理 | `internal/api` | 各业务 API handler（admin、payment、checkin、passkey 等） |
| 中间件 | `internal/middleware` | 认证、限流、请求体限制 |
| 业务 | `internal/service` | 代理网关、计费、认证、同步、状态监控、扩展 Hook |
| 数据 | `internal/model` | GORM 模型与数据库初始化 |
| 配置 | `internal/config` | 环境变量加载 |

详见 [代码结构](/develop/project-structure)。

## 启动流程

`app.Run()` 的顺序（见 `internal/app/app.go`）：

1. `config.Init()` 加载 `.env` / 环境变量；
2. `model.InitDB()` 打开 SQLite 并 `AutoMigrate` 所有模型；
3. `service.RunStartupHooks()` 执行注册的启动 Hook（专业版在此初始化订阅、Meta Model 等）；
4. 构造各 Service（auth、proxy、sync、status、rateLimiter）；
5. 启动后台循环：价格同步循环、状态监控循环；
6. 初始化 Gin，挂上请求体大小限制中间件；
7. 加载内嵌前端资源；
8. 注册公开路由、`/auth`、网关 `/v1` `/v1beta`、管理 `/api`、用户 `/api/user`，并应用 admin/user 路由 Hook；
9. SPA fallback：非 API 路径回退到 `index.html`；
10. 监听端口。

## 网关与协议转换

网关同时暴露 OpenAI、Claude、Gemini 三套入口。`proxy` 服务根据**入口路径**判定客户端协议，根据**目标模型所在渠道类型**判定上游协议，必要时做双向（含流式）协议转换。详见 [请求处理流程](/develop/request-flow)。

## 前端

前端是独立的 React 19 + Vite + TS SPA（`web/`），构建产物通过 Go `embed` 内嵌进后端，由后端在 `/assets` 等路径提供，未匹配的非 API 路径回退到 `index.html` 以支持前端路由。
