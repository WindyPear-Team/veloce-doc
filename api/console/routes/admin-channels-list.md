# GET `/api/channels`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/channels` |
| 鉴权 | 管理员 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 否 | 无请求体时不需要。 |

## Path 参数

无。

## Query 参数

无。

## Body 参数

无。

## 返回值

上级渠道列表。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 上级渠道 ID。 |
| `user_channel_id` | number/null | 绑定的用户可见渠道 ID。 |
| `user_channel` | object | 绑定的用户渠道对象。 |
| `name` | string | 渠道名称。 |
| `type` | string | 上级协议类型，例如 completion、responses、openai-video、kling、claude、gemini。 |
| `base_url` | string | 上级 API Base URL。 |
| `api_key` | string | 上级密钥，管理员接口返回。 |
| `multiplier` | string/number | 上级渠道倍率。 |
| `priority` | number | 优先级，越大越优先。 |
| `weight` | number | 加权轮询权重。 |
| `enabled` | boolean | 是否启用。 |
| `models` | array | 该上级渠道的模型配置数组。 |
| `group_multipliers` | array | 分组倍率覆盖，元素包含 id、channel_id、group_id、group、multiplier、created_at、updated_at。 |
| `created_at` | string | 创建时间。 |
| `updated_at` | string | 更新时间。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

