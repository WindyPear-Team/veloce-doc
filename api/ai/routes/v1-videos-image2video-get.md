# GET `/v1/videos/image2video/:id`

Kling 风格图生视频查询任务接口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/v1/videos/image2video/:id` |
| 鉴权 | API Key 或登录 JWT |

## Header 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer sk-...` 或 `Bearer <jwt>`。 |
| `x-api-key` | 否 | 可替代 `Authorization`。 |

## Path 参数

| 参数 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `id` | 是 | string | 本地视频任务 ID。 |

## Query 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `key` | 否 | 可替代 Header。 |

## 请求体

无。

## 返回值

后端会查询本地任务，并在任务未终止时按 Kling 上级路径拉取状态。Kling 的 `data.task_result.videos` 会归一到返回值 `data`。

```json
{
  "id": "vtask_xxx",
  "object": "video.generation",
  "model": "kling-video-model",
  "status": "succeeded",
  "upstream_id": "kling-task-id",
  "data": [
    { "url": "https://example.com/video.mp4" }
  ],
  "upstream_response": {}
}
```
