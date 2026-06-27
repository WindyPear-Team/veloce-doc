# GET `/api/public/status`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/public/status` |
| 鉴权 | 公开 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 否 | 公开接口无需鉴权。 |
| `Content-Type` | Header | string | 否 | 无请求体时不需要。 |

## Path 参数

无。

## Query 参数

无。

## Body 参数

无。

## 返回值

状态页监控列表和最近检查结果。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `monitors` | array | 公开状态监控项。 |
| `monitors[].name` | string | 名称。 |
| `monitors[].target_url` | string | 目标 URL。 |
| `monitors[].status` | string | 状态。 |
| `monitors[].uptime` | number | 可用率。 |
| `monitors[].last_checked_at` | string/null | 最近检查时间。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

