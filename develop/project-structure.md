# 代码结构

本页说明仓库布局，以及后端、前端的目录职责。

## 仓库总览

```text
veloce/                    专业版（私有）根仓库
├── main.go                 premium.Register() 后启动社区版 app
├── go.mod                  module .../flai/premium，replace 指向 ./community
├── internal/premium/       专业版私有实现（Meta Model、订阅、安全增强等）
├── community/              社区版（公开，独立 Go 项目，git 子模块）
│   ├── main.go             社区版入口
│   ├── go.mod              module github.com/WindyPear-Team/flai
│   ├── internal/           社区版后端
│   └── web/                前端源码（独立子模块）
├── docs/                   文档（含本 VitePress 站点 site/）
└── dist/                   构建产物
```

::: tip 三个 git 仓库
`community/` 与 `web/` 都是独立 git 仓库（子模块），`docs/` 也是独立仓库且被父仓库 `.gitignore`。提交时注意你在哪个仓库里。
:::

## 后端目录（`community/internal`）

```text
internal/
├── app/            应用组装与路由注册（app.go）
├── api/            HTTP handler
│   ├── admin.go            系统设置、公告、状态监控、渠道、模型等
│   ├── checkin.go          签到
│   ├── passkey.go          WebAuthn
│   ├── payment.go          支付通用
│   └── payment_openpayment.go  OpenPayment 网关
├── config/         环境变量加载（config.go）
├── middleware/     认证、限流、请求体限制
│   ├── auth.go
│   └── rate_limit_community.go
├── model/          GORM 模型与 DB 初始化
│   ├── db.go
│   ├── models.go           核心数据模型
│   └── price_tier.go       阶梯价格类型
└── service/        业务逻辑
    ├── proxy.go            网关核心：路由、转换、计费入口
    ├── billing.go          费用计算（token 估算、阶梯价）
    ├── auth.go             JWT、初始化、OIDC
    ├── api_key.go          API 密钥
    ├── password_auth.go    密码登录
    ├── passkey.go          Passkey
    ├── providers.go        供应商预设与推断
    ├── sync.go             模型/价格同步
    ├── status.go           状态监控
    ├── hooks.go            扩展 Hook 定义与注册
    ├── edition.go          版本标识
    ├── content_filter_community.go  敏感词过滤（Hook 壳）
    └── url_guard_community.go       SSRF 防护（Hook 壳）
```

## 专业版目录（`internal/premium`）

```text
internal/premium/
├── register.go      注册所有 Hook 的入口（premium.Register()）
├── meta_model.go    Meta Model 解析与运行时
├── meta_dsl.go      Meta Model DSL 解析器
└── subscription.go  订阅/计费增强
```

专业版只通过社区版暴露的 `Register*` Hook 接入，不修改社区核心。

## 前端目录（`web/src`）

```text
src/
├── main.tsx / App.tsx       入口与路由
├── lib/
│   ├── api.ts               axios 封装，调用后端 API
│   ├── i18n.tsx             多语言
│   ├── passkey.ts           WebAuthn 前端逻辑
│   └── public-settings.ts   读取公开设置
├── components/
│   ├── layout/              Layout、Sidebar、PublicTopBar
│   └── ui/                  基础组件（button、card、dialog、table…）
└── pages/                   页面
    ├── Setup.tsx            初始化向导
    ├── Login.tsx            登录
    ├── Dashboard.tsx        仪表盘
    ├── DataBoard.tsx        数据看板
    ├── Wallet.tsx           钱包/充值
    ├── APIKeys.tsx          密钥管理
    ├── Logs.tsx             用量日志
    ├── Chat.tsx / Images.tsx  在线试用
    ├── ModelCatalog.tsx     模型目录
    ├── Channels.tsx / Models.tsx / Users.tsx  管理页
    ├── Settings.tsx / SystemManagement.tsx    设置
    ├── StatusPage.tsx       状态页
    └── PublicContent.tsx    公开内容页（关于/条款等）
```

前端技术栈：React 19、Vite、TypeScript、Tailwind、React Router、TanStack Query、Radix UI、Recharts。
