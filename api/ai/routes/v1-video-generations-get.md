# GET `/v1/video/generations/:id`

OpenAI 风格查询视频任务接口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/v1/video/generations/:id` |
| 鉴权 | API Key 或登录 JWT |

## Header 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer sk-...` 或 `Bearer <jwt>`。 |
| `x-api-key` | 否 | 可替代 `Authorization`。 |

## Path 参数

| 参数 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `id` | 是 | string | 本地视频任务 ID，例如 `vtask_xxx`。 |

## Query 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `key` | 否 | 可替代 Header。 |

## 请求体

无。

## 返回值

返回本地视频任务对象。若任务未结束且已有上游任务 ID，后端会向上游拉取最新状态并更新本地状态。

```json
{
  "id": "vtask_xxx",
  "object": "video.generation",
  "model": "video-model",
  "status": "succeeded",
  "cost": "0.35",
  "upstream_id": "provider-task-id",
  "created_at": 1760000000,
  "updated_at": 1760000000,
  "upstream_response": {},
  "data": [
    { "url": "https://example.com/video.mp4" }
  ]
}
```
