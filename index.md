---
layout: home

hero:
  name: "Veloce"
  text: "API 网关与 AI Agent"
  tagline: 面向 AI 平台与开发者生态的统一计费、鉴权与上游路由网关，拥有内置 Agent 和代理工作室等高级特性
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 项目介绍
      link: /guide/introduction
    - theme: alt
      text: 开发文档
      link: /develop/architecture

features:
  - icon: 🔌
    title: 兼容主流协议
    details: 同时兼容 OpenAI、Claude（Anthropic Messages）与 Gemini 协议，客户端无需改造即可接入，并在网关内自动做协议转换。
  - icon: 🧮
    title: 精细化计费
    details: 按 token 计费，支持输入/输出/缓存命中/图像/音频分项定价、阶梯价格、分组倍率与渠道倍率，每次请求都有完整账单记录。
  - icon: 🛡️
    title: 多种认证方式
    details: 内置 OIDC 单点登录、Passkey（WebAuthn）与密码登录，密钥支持模型、IP 与额度限制。
  - icon: 🔀
    title: 上游渠道路由
    details: 多上游渠道管理，支持优先级、权重、轮询等路由算法，配合用户渠道与分组实现灵活的供给与定价分层。
  - icon: 💰
    title: 内置 Agent
    details: 可以让用户快速进行云端控制的代码开发，开箱即用。
  - icon: 🏗️
    title: 元模型
    details: 使用概率、强度等条件动态选择模型，并可向用户隐藏真实模型调用。
---

## 这是什么

Veloce 是一个 **AI API 网关与服务市场**，用于搭建 AI 平台和开发者生态。它把多个上游 AI 供应商聚合到一个 OpenAI 兼容的网关之后，统一处理认证、计费、额度、路由与用量记录，并提供一套现代化的管理后台。

- 后端使用 **Go**（Gin + GORM，支持 SQLite / PostgreSQL / MySQL）编写；
- 前端使用 **React 19 + Vite + TypeScript + Tailwind** 编写，构建产物内嵌进后端二进制；
- 单文件可执行，部署简单。

## 文档导航

| 我是… | 推荐从这里开始 |
| --- | --- |
| **终端用户 / 开发者**（想调用 API） | [快速开始](/guide/getting-started) → [调用网关](/guide/calling-the-api) |
| **平台管理员**（部署和运营平台） | [安装部署](/admin/installation) → [初始化设置](/admin/initial-setup) |
| **贡献者**（参与开发或二次开发） | [系统架构](/develop/architecture) → [本地开发](/develop/local-development) |

::: tip 社区版
本文档覆盖 **社区版（Community Edition）** 的全部功能。专业版的高级特性以扩展形式存在，部分章节会单独标注。
:::
