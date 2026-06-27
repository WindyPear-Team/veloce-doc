# Kling 视频接口

Kling 图生视频接口是历史兼容入口，用于已有客户端按 `/v1/videos/image2video` 调用的场景。新接入如果不依赖该路径，建议优先使用 [OpenAI 风格视频接口](/api/ai/video-openai) 的任务化路由。

## 路由

| 路由 | 说明 |
| --- | --- |
| [POST /v1/videos/image2video](/api/ai/routes/v1-videos-image2video-post) | Kling 图生视频创建任务接口。 |
| [GET /v1/videos/image2video/:id](/api/ai/routes/v1-videos-image2video-get) | Kling 图生视频查询任务接口。 |

## 使用建议

| 场景 | 建议 |
| --- | --- |
| 旧客户端已经使用 Kling image2video 路径 | 保持使用本页两个路由。 |
| 新的视频模型接入 | 使用 `POST /v1/video/generations`，通过 `model` 区分上游模型。 |
| 查询结果 | 使用创建任务返回的任务 ID 调用对应查询接口。 |
