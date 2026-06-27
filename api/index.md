# API 文档

这里按接口类型拆分记录后端 HTTP API。每个页面包含请求方式、路径、参数和返回值。

## 鉴权

| 类型 | 使用位置 | 凭据 |
| --- | --- | --- |
| 公开 | 健康检查、公开配置、支付回调、初始化 | 无 |
| 登录认证 | `/api/user/*` | `Authorization: Bearer <jwt>` |
| 管理员 | `/api/*` 管理接口 | `Authorization: Bearer <jwt>`，且用户为管理员 |
| 网关 API | `/v1/*`、`/v1beta/*` | `Authorization: Bearer sk-...`，也支持 `x-api-key` 和 `?key=` |

## 社区版接口

| 页面 | 内容 |
| --- | --- |
| [公开接口](/api/public) | 健康检查、公开设置、公开模型、初始化。 |
| [支付回调](/api/payment) | 易支付、OpenPayment 回调和提交页。 |
| [认证接口](/api/auth) | 密码登录、注册、Passkey、OIDC。 |
| [AI 网关](/api/gateway) | AI 接口索引；具体路由按类型拆到独立页面。 |
| [管理员接口](/api/admin) | 系统设置、渠道、模型、分组、用户、统计。 |
| [用户接口](/api/user) | 当前用户、目录、日志、签到、支付、Passkey、API Key。 |


## AI 接口拆分

| 页面 | 路由 |
| --- | --- |
| [模型列表](/api/ai/models) | `GET /v1/models` |
| [OpenAI Chat / Completions](/api/ai/openai-chat) | `POST /v1/chat/completions`、`POST /v1/completions` |
| [OpenAI Responses](/api/ai/responses) | `POST /v1/responses` |
| [图片接口](/api/ai/images) | `POST /v1/images/generations`、`POST /v1/images/edits` |
| [OpenAI 风格视频](/api/ai/video-openai) | OpenAI 视频生成和任务接口 |
| [Kling 视频](/api/ai/video-kling) | Kling 图生视频创建和查询接口 |
| [Claude](/api/ai/claude) | `POST /v1/messages` |
| [Gemini](/api/ai/gemini) | `/v1/models/:modelAction`、`/v1beta/models/:modelAction` |

## 控制台接口

| 页面 | 内容 |
| --- | --- |
| [控制台总览](/api/console/) | 控制台 API 接入顺序和模块导航。 |
| [公共控制台接口](/api/console/public) | 启动配置、公开模型、状态页、初始化。 |
| [认证控制台接口](/api/console/auth) | 登录、注册、Passkey、OIDC。 |
| [用户控制台接口](/api/console/user) | 用户首页、钱包、签到、API Key、账号设置。 |
| [管理员控制台接口](/api/console/admin) | 系统设置、渠道、模型、用户、统计。 |
| [高级版控制台接口](/api/console/premium) | 订阅、兑换码、Meta Model、高级聊天。 |
## 高级版接口

高级版接口通过 route hook 额外挂载，社区版不会注册这些路由。

| 页面 | 内容 |
| --- | --- |
| [高级版接口](/api/premium) | 订阅、兑换码、Meta Model、高级聊天、连接器设备、Agent、Skill。 |

## 通用响应

错误响应：

```json
{
  "error": "message"
}
```

分页响应：

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "page_size": 20
}
```

常见分页参数：

| 参数 | 位置 | 类型 | 说明 |
| --- | --- | --- | --- |
| `page` | Query | integer | 页码，从 `1` 开始。 |
| `page_size` | Query | integer | 每页数量。 |
| `from` | Query | string | 起始时间，部分列表接口支持。 |
| `to` | Query | string | 结束时间，部分列表接口支持。 |


