# GET `/api/user/logs`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/logs` |
| 鉴权 | 登录用户 |

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
| `page` | Query | number | 否 | 请求字段。 |
| `page_size` | Query | number | 否 | 请求字段。 |
| `api_key_id` | Query | number | 否 | 请求字段。 |
| `model` | Query | string | 是 | 模型名。 |
| `from` | Query | string | 否 | 请求字段。 |
| `to` | Query | string | 否 | 请求字段。 |

## Body 参数

无。

## 返回值

用量日志数组或分页对象。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 日志 ID。 |
| `user_id` | number | 用户 ID。 |
| `api_key_id` | number/null | API Key ID。 |
| `user_channel_id` | number/null | 用户渠道 ID。 |
| `channel_id` | number/null | 上级渠道 ID。 |
| `model_name` | string | 模型名。 |
| `input_tokens` | number | 输入 token。 |
| `output_tokens` | number | 输出 token。 |
| `cached_input_tokens` | number | 缓存输入 token。 |
| `cost` | string/number | 费用。 |
| `status` | string | 请求状态。 |
| `error_message` | string | 错误信息。 |
| `created_at` | string | 创建时间。 |

分页模式返回以下包裹字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | array | 当前页数据数组。 |
| `total` | number | 总条数。 |
| `page` | number | 当前页码。 |
| `page_size` | number | 每页数量。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

