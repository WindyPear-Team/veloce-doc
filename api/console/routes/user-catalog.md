# GET `/api/user/catalog`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/catalog` |
| 鉴权 | 登录用户 |

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

当前用户可用渠道、模型、价格目录。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 用户可见渠道 ID。 |
| `name` | string | 渠道名称。 |
| `description` | string | 渠道描述。 |
| `multiplier` | string/number | 用户渠道倍率。 |
| `routing_algorithm` | string | 路由算法：priority、round_robin、weighted_round_robin。 |
| `enabled` | boolean | 是否启用。 |
| `channels` | array | 关联上级渠道数组，管理端列表会预加载。 |
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

