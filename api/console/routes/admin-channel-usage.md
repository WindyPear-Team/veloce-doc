# GET `/api/channel-usage`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/channel-usage` |
| 鉴权 | 管理员 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 否 | 无请求体时不需要。 |

## Path 参数

无。

## Query 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `from` | Query | string | 否 | 请求字段。 |
| `to` | Query | string | 否 | 请求字段。 |

## Body 参数

无。

## 返回值

渠道用量统计。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `user_channels` | array | 用户渠道用量数组。 |
| `upstream_channels` | array | 上级渠道用量数组。 |
| `[].id` | number | 渠道 ID。 |
| `[].name` | string | 渠道名称。 |
| `[].request_count` | number | 请求数。 |
| `[].input_tokens` | number | 输入 token。 |
| `[].output_tokens` | number | 输出 token。 |
| `[].cached_input_tokens` | number | 缓存输入 token。 |
| `[].total_tokens` | number | 总 token。 |
| `[].total_cost` | string/number | 总费用。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

