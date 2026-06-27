# AI 网关接口

AI 网关接口使用 API Key 或登录 JWT。

```text
Authorization: Bearer sk-your-key
```

也支持：

```text
x-api-key: sk-your-key
```

本页是 AI 网关索引。每一个 AI 路由都有单独页面，页面内写明 Header、Query、Path、Body/Form 参数和返回值。

## 按类型查看

| 分类 | 路由 |
| --- | --- |
| [模型列表](/api/ai/models) | `GET /v1/models` |
| [OpenAI Chat / Completions](/api/ai/openai-chat) | `POST /v1/chat/completions`、`POST /v1/completions` |
| [OpenAI Responses](/api/ai/responses) | `POST /v1/responses` |
| [图片接口](/api/ai/images) | `POST /v1/images/generations`、`POST /v1/images/edits` |
| [OpenAI 风格视频](/api/ai/video-openai) | OpenAI 风格视频路由和兼容别名 |
| [Kling 视频](/api/ai/video-kling) | Kling 图生视频创建和查询接口 |
| [Claude](/api/ai/claude) | `POST /v1/messages` |
| [Gemini](/api/ai/gemini) | `POST /v1/models/:modelAction`、`POST /v1beta/models/:modelAction` |

## 每个路由

| 路由 | 页面 |
| --- | --- |
| `GET /v1/models` | [详情](/api/ai/routes/v1-models) |
| `POST /v1/chat/completions` | [详情](/api/ai/routes/v1-chat-completions) |
| `POST /v1/completions` | [详情](/api/ai/routes/v1-completions) |
| `POST /v1/responses` | [详情](/api/ai/routes/v1-responses) |
| `POST /v1/images/generations` | [详情](/api/ai/routes/v1-images-generations) |
| `POST /v1/images/edits` | [详情](/api/ai/routes/v1-images-edits) |
| `POST /v1/videos/generations` | [详情](/api/ai/routes/v1-videos-generations) |
| `POST /v1/video/generations` | [详情](/api/ai/routes/v1-video-generations-post) |
| `GET /v1/video/generations/:id` | [详情](/api/ai/routes/v1-video-generations-get) |
| `POST /v1/videos/image2video` | [详情](/api/ai/routes/v1-videos-image2video-post) |
| `GET /v1/videos/image2video/:id` | [详情](/api/ai/routes/v1-videos-image2video-get) |
| `POST /v1/video/tasks` | [详情](/api/ai/routes/v1-video-tasks-post) |
| `GET /v1/video/tasks/:id` | [详情](/api/ai/routes/v1-video-tasks-get) |
| `POST /v1/videos/tasks` | [详情](/api/ai/routes/v1-videos-tasks-post) |
| `GET /v1/videos/tasks/:id` | [详情](/api/ai/routes/v1-videos-tasks-get) |
| `POST /v1/messages` | [详情](/api/ai/routes/v1-messages) |
| `POST /v1/models/:modelAction` | [详情](/api/ai/routes/v1-models-model-action) |
| `POST /v1beta/models/:modelAction` | [详情](/api/ai/routes/v1beta-models-model-action) |

## 通用错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 请求体不合法、缺少模型、上游协议不支持、计费档位不允许。 |
| `401` | 缺少或无效凭据。 |
| `402` | 余额不足或 API Key 额度不足。 |
| `403` | API Key 不允许访问模型、来源 IP 不允许。 |
| `429` | 触发限流。 |
| `502` | 上游请求失败或响应读取失败。 |
