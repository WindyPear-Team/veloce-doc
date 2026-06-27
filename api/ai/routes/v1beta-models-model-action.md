# POST `/v1beta/models/:modelAction`

Gemini v1beta 兼容入口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1beta/models/:modelAction` |
| 鉴权 | API Key 或登录 JWT |
| Content-Type | `application/json` |

## 参数

Header、Query、Path、Body 参数全部同 [`POST /v1/models/:modelAction`](/api/ai/routes/v1-models-model-action)。

## 返回值

返回值同 [`POST /v1/models/:modelAction`](/api/ai/routes/v1-models-model-action)，为 Gemini 响应或协议转换后的 Gemini 兼容响应。
