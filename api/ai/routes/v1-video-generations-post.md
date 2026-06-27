# POST `/v1/video/generations`

OpenAI 风格创建视频任务接口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/video/generations` |
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
| `model` | 是 | string | 平台视频模型名。也兼容 `model_name`、`modelName`。 |
| `model_name` | 否 | string | 兼容模型字段。 |
| `modelName` | 否 | string | 兼容模型字段。 |
| `prompt` | 是 | string | 视频提示词。 |
| `negative_prompt` | 否 | string | 负面提示词。 |
| `input` | 否 | string/object/array | 兼容输入字段。 |
| `first_frame_prompt` | 否 | string | 首帧提示词。 |
| `image` | 否 | string | 图生视频图片字段，按上游协议透传。 |
| `image_url` | 否 | string | 图生视频图片 URL，Kling 上游会映射为 `image`。 |
| `first_frame_image` | 否 | string | 首帧图片，Kling 上游可能映射为 `image`。 |
| `firstFrameImage` | 否 | string | 首帧图片兼容字段。 |
| `size` | 否 | string | 分辨率档位；视频计费会读取。 |
| `resolution` | 否 | string | 分辨率档位；视频计费会读取。 |
| `quality` | 否 | string | 分辨率/质量字段；视频计费会读取。 |
| `aspect_ratio` | 否 | string | 比例档位；视频计费会读取。 |
| `aspectRatio` | 否 | string | 比例兼容字段。 |
| `width` | 否 | integer | 宽度。 |
| `height` | 否 | integer | 高度。 |
| `video_width` | 否 | integer | 宽度兼容字段。 |
| `video_height` | 否 | integer | 高度兼容字段。 |
| `duration` | 否 | integer/string | 时长；`quota_type=100` 时通常必填。 |
| `duration_seconds` | 否 | integer | 时长兼容字段。 |
| `seconds` | 否 | integer | 时长兼容字段。 |
| `video_duration` | 否 | integer | 时长兼容字段。 |
| `n` | 否 | integer | 数量；计费会读取。 |
| `num_videos` | 否 | integer | 数量兼容字段。 |
| `count` | 否 | integer | 数量兼容字段。 |
| `watermark` | 否 | boolean | 透传给上游。 |
| `callback_url` | 否 | string | 透传给上游。 |

未列出的上游视频字段会保留并转发。

## 返回值

```json
{
  "id": "vtask_xxx",
  "object": "video.generation",
  "model": "video-model",
  "status": "queued",
  "cost": "0.35",
  "upstream_id": "provider-task-id",
  "created_at": 1760000000,
  "updated_at": 1760000000,
  "upstream_response": {},
  "data": []
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 本地任务 ID。 |
| `object` | string | 固定为 `video.generation`。 |
| `model` | string | 平台模型名。 |
| `status` | string | `queued`、`processing`、`succeeded`、`failed` 等。 |
| `cost` | string/number | 创建任务时扣费金额。 |
| `upstream_id` | string | 上游任务 ID。 |
| `created_at` | integer | Unix 秒。 |
| `updated_at` | integer | Unix 秒。 |
| `upstream_response` | object | 上游原始响应。 |
| `data` | array/object | 上游结果数据，完成后可能出现。 |
