# POST `/v1/videos/generations`

旧版视频生成转发接口。该路由直接返回上游响应，主要用于兼容；新任务化接口建议使用 `POST /v1/video/generations`。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/videos/generations` |
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
| `model` | 是 | string | 平台视频模型名。 |
| `prompt` | 是 | string | 视频提示词。 |
| `negative_prompt` | 否 | string | 负面提示词，敏感词检测会读取。 |
| `input` | 否 | string/object/array | 兼容输入字段，敏感词检测会读取。 |
| `first_frame_prompt` | 否 | string | 首帧提示词，敏感词检测会读取。 |
| `size` | 否 | string | 分辨率档位；视频计费会读取。 |
| `resolution` | 否 | string | 分辨率档位；视频计费会读取。 |
| `quality` | 否 | string | 兼容分辨率/质量字段；视频计费会读取。 |
| `aspect_ratio` | 否 | string | 比例档位；视频计费会读取。 |
| `aspectRatio` | 否 | string | 兼容字段；视频计费会读取。 |
| `width` | 否 | integer | 宽度；没有分辨率字段时用于组成 `宽x高`。 |
| `height` | 否 | integer | 高度；没有分辨率字段时用于组成 `宽x高`。 |
| `video_width` | 否 | integer | 兼容宽度字段。 |
| `video_height` | 否 | integer | 兼容高度字段。 |
| `duration` | 否 | integer/string | 时长；视频计费会读取。 |
| `duration_seconds` | 否 | integer | 兼容时长字段。 |
| `seconds` | 否 | integer | 兼容时长字段。 |
| `video_duration` | 否 | integer | 兼容时长字段。 |
| `n` | 否 | integer | 数量；视频计费会读取。 |
| `num_videos` | 否 | integer | 兼容数量字段。 |
| `count` | 否 | integer | 兼容数量字段。 |

未列出的上游视频字段会保留并转发。

## 返回值

返回上游原始响应。计费会优先使用返回中的 `usage`；否则按请求、响应中的视频数量估算，或按 `quota_type=100` 的分辨率和时长组合计费。
