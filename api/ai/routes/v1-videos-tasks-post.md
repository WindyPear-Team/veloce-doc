# POST `/v1/videos/tasks`

视频任务创建兼容别名，等价于 `POST /v1/video/generations`。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/videos/tasks` |
| 鉴权 | API Key 或登录 JWT |
| Content-Type | `application/json` |

## 参数

Header、Query、Body 参数全部同 [`POST /v1/video/generations`](/api/ai/routes/v1-video-generations-post)。

## 返回值

返回本地视频任务对象，同 [`POST /v1/video/generations`](/api/ai/routes/v1-video-generations-post)。
