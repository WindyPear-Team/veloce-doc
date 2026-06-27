# POST `/v1/videos/image2video`

Kling 风格图生视频创建任务接口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/videos/image2video` |
| 鉴权 | API Key 或登录 JWT |
| Content-Type | `application/json` |

## Header 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer sk-...` 或 `Bearer <jwt>`。 |
| `x-api-key` | 否 | 可替代 `Authorization`。 |
| `Content-Type` | 是 | `application/json`。 |

## Query 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `key` | 否 | 可替代 Header。 |

## Body 参数

| 参数 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `model_name` | 是 | string | 平台模型名。也兼容 `model`、`modelName`。 |
| `model` | 否 | string | 兼容模型字段。 |
| `modelName` | 否 | string | 兼容模型字段。 |
| `image` | 是 | string | 图片 URL 或上游支持的图片数据。 |
| `image_url` | 否 | string | 没有 `image` 时后端会映射为 `image`。 |
| `first_frame_image` | 否 | string | 没有 `image` 时可映射为 `image`。 |
| `firstFrameImage` | 否 | string | 兼容字段。 |
| `prompt` | 否 | string | 提示词。 |
| `negative_prompt` | 否 | string | 负面提示词。 |
| `cfg_scale` | 否 | number | Kling 参数，透传。 |
| `mode` | 否 | string | Kling 参数，透传。 |
| `camera_control` | 否 | object | Kling 参数，透传。 |
| `aspect_ratio` | 否 | string | 比例，如 `16:9`、`9:16`、`1:1`；计费会读取。 |
| `aspectRatio` | 否 | string | 兼容比例字段。 |
| `size` | 否 | string | 没有 `aspect_ratio` 时可映射为 `aspect_ratio`。 |
| `resolution` | 否 | string | 没有 `aspect_ratio` 时可映射为 `aspect_ratio`。 |
| `duration` | 否 | string/integer | 时长；计费会读取。 |
| `duration_seconds` | 否 | integer | 时长兼容字段。 |
| `seconds` | 否 | integer | 时长兼容字段。 |
| `video_duration` | 否 | integer | 时长兼容字段。 |
| `num_videos` | 否 | integer | 生成数量。 |
| `n` | 否 | integer | 没有 `num_videos` 时后端会映射为 `num_videos`。 |
| `count` | 否 | integer | 数量兼容字段，计费会读取。 |
| `callback_url` | 否 | string | Kling 回调地址，透传。 |
| `external_task_id` | 否 | string | Kling 外部任务标识，透传。 |

未列出的 Kling 兼容字段也会保留并转发。

## 返回值

返回本地视频任务对象：

```json
{
  "id": "vtask_xxx",
  "object": "video.generation",
  "model": "kling-video-model",
  "status": "queued",
  "cost": "0.35",
  "upstream_id": "kling-task-id",
  "created_at": 1760000000,
  "updated_at": 1760000000,
  "upstream_response": {}
}
```
