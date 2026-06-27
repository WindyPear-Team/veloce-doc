# GET `/v1/video/tasks/:id`

视频任务查询兼容别名，等价于 `GET /v1/video/generations/:id`。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/v1/video/tasks/:id` |
| 鉴权 | API Key 或登录 JWT |

## 参数

Header、Query、Path 参数全部同 [`GET /v1/video/generations/:id`](/api/ai/routes/v1-video-generations-get)。

## 返回值

返回本地视频任务对象，同 [`GET /v1/video/generations/:id`](/api/ai/routes/v1-video-generations-get)。
