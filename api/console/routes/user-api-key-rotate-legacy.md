# POST `/api/user/api-key/rotate`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/user/api-key/rotate` |
| 鉴权 | 登录用户 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 是 | `application/json`。 |

## Path 参数

无。

## Query 参数

无。

## Body 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `可选 API Key 标识` | Body | string | 否 | 请求字段。 |

## 返回值

新明文 API Key。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | API Key ID。 |
| `name` | string | 令牌名称。 |
| `api_key` | string | 完整密钥；仅创建或轮换后返回一次，列表通常为空。 |
| `key_prefix` | string | 密钥前缀。 |
| `allowed_models` | array | 允许的模型名列表，空数组表示不限模型。 |
| `allowed_user_channels` | array | 允许的用户渠道 ID；当前后端要求恰好绑定一个用户渠道。 |
| `allowed_ips` | array | 允许来源 IP/CIDR，空数组表示不限 IP。 |
| `quota_limit` | string/number | 额度上限，0 表示不限。 |
| `quota_remaining` | string/number/null | 剩余额度，仅 quota_limit 大于 0 时返回。 |
| `enabled` | boolean | 是否启用。 |
| `usage` | object | 用量统计。 |
| `usage.request_count` | number | 请求数。 |
| `usage.input_tokens` | number | 输入 token 数。 |
| `usage.output_tokens` | number | 输出 token 数。 |
| `usage.cached_input_tokens` | number | 缓存输入 token 数。 |
| `usage.total_tokens` | number | 输入加输出 token 数。 |
| `usage.total_cost` | string/number | 累计费用。 |
| `last_used_at` | string/null | 最后使用时间。 |
| `usage_reset_at` | string/null | 用量重置起点。 |
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

