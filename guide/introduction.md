# 项目介绍

WindyPear Token Market 是一个面向 AI 平台与开发者生态的 **AI Token 市场与 API 网关**。它把多个上游 AI 供应商（OpenAI、Claude、Gemini 等）聚合在一个统一的、兼容 OpenAI 的网关之后，并负责处理：

- **认证**：API Key、OIDC、Passkey、密码登录；
- **计费**：按 token 精细计费，支持缓存、图像、音频等分项价格与阶梯定价；
- **额度与限流**：用户余额、密钥额度、按密钥/IP 的访问限制、请求速率限制；
- **路由**：多上游渠道的优先级、权重与轮询路由；
- **运营**：钱包充值、签到、邀请返佣、公告、状态监控、管理后台。

## 适用场景

- 自建一个对外提供 AI API 的中转/聚合平台，向用户售卖 token 额度；
- 在团队内部统一管理多个 AI 供应商账号与额度，集中计费和审计；
- 作为开发者，把它当作一个稳定的 OpenAI 兼容入口，屏蔽上游差异。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 后端 | Go、[Gin](https://gin-gonic.com/)、[GORM](https://gorm.io/)、SQLite |
| 前端 | React 19、Vite、TypeScript、Tailwind CSS、React Router、TanStack Query |
| 鉴权 | JWT（后台会话）、OIDC、WebAuthn/Passkey |
| 部署 | 单一 Go 二进制，前端构建产物内嵌（`embed`） |

## 版本分层

项目分为 **社区版（Community Edition）** 与 **专业版（Professional Edition）**：

- 社区版是一个可独立运行、生产可用的核心，提供了 AI API 管理、认证、计费和上游管理的完整基础能力，以 MIT 协议开源；
- 专业版在社区版之上，通过中立的扩展 Hook 注入高级特性（例如 [Meta Model 路由 DSL](/develop/meta-model-dsl)），代码不混入社区核心。

详见 [版本分层模型](/develop/editions)。

## 主要特性一览

- OpenAI 兼容的 API 网关，同时兼容 Claude Messages 与 Gemini 协议；
- 多上游供应商（渠道）管理；
- OIDC、Passkey（WebAuthn）、API Key、密码多种认证；
- 用户余额管理与按密钥额度限制；
- token 用量日志与完整账单；
- 基础计费系统（分项价格、阶梯价、分组/渠道倍率）；
- 图像生成支持；
- 在线充值、签到、邀请返佣；
- 公告与公开状态监控页；
- 现代化管理后台。

下一步：跟随 [快速开始](/guide/getting-started) 跑起来，或阅读 [核心概念](/guide/concepts) 先建立整体认知。
