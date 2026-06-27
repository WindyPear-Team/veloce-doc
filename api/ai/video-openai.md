# OpenAI 风格视频接口

视频接口采用任务化模型：先创建任务，得到本地任务 ID 和上游任务 ID，再轮询查询结果。新接入建议使用单数路径 `/v1/video/generations`，其他路径主要用于兼容旧客户端或旧协议。

## 推荐入口

| 路由 | 说明 |
| --- | --- |
| [POST /v1/video/generations](/api/ai/routes/v1-video-generations-post) | 创建视频任务。 |
| [GET /v1/video/generations/:id](/api/ai/routes/v1-video-generations-get) | 查询视频任务。 |

## 兼容入口

| 路由 | 说明 |
| --- | --- |
| [POST /v1/videos/generations](/api/ai/routes/v1-videos-generations) | 旧版视频生成转发接口。 |
| [POST /v1/video/tasks](/api/ai/routes/v1-video-tasks-post) | 创建视频任务兼容别名。 |
| [GET /v1/video/tasks/:id](/api/ai/routes/v1-video-tasks-get) | 查询视频任务兼容别名。 |
| [POST /v1/videos/tasks](/api/ai/routes/v1-videos-tasks-post) | 创建视频任务兼容别名。 |
| [GET /v1/videos/tasks/:id](/api/ai/routes/v1-videos-tasks-get) | 查询视频任务兼容别名。 |

## 任务字段

| 字段 | 说明 |
| --- | --- |
| `model` | 平台视频模型名，兼容 `model_name`、`modelName`。 |
| `prompt` | 视频提示词。 |
| `image_url` / `first_frame_image` | 图生视频或首帧控制字段，按上游协议映射或透传。 |
| `resolution` / `size` / `quality` | 分辨率或质量档位，参与计费。 |
| `duration` / `seconds` | 视频时长，参与计费。 |
| `callback_url` | 如上游支持，可作为回调地址透传。 |

## APIMart 能力映射

APIMart 把视频按模型拆分为 Kling、Veo、Sora、Seedance、Wan、Vidu、Pixverse 等文档。本项目统一使用视频任务入口，模型差异通过 `model` 和上游兼容字段表达。
