# PUT `/api/channel-models/:id/group-multipliers`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `PUT` |
| 路径 | `/api/channel-models/:id/group-multipliers` |
| 鉴权 | 管理员 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 是 | `application/json`。 |

## Path 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | Path | string | 是 | 路径参数 `id`。 |

## Query 参数

无。

## Body 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `group_id` | Body | number | 否 | 分组 ID。 |
| `multiplier` | Body | string/number | 否 | 请求字段。 |

## 返回值

更新成功响应。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 渠道模型配置 ID。 |
| `channel_id` | number | 上级渠道 ID。 |
| `channel` | object | 上级渠道对象，部分列表返回。 |
| `model_id` | number | 全局模型 ID。 |
| `model` | object | 全局模型对象。 |
| `upstream_model_name` | string | 上级真实模型名；为空时使用全局模型名。 |
| `input_price` | string/number | 旧版渠道输入价格字段。 |
| `output_price` | string/number | 旧版渠道输出价格字段。 |
| `enabled` | boolean | 是否启用。 |
| `group_multipliers` | array | 模型级分组倍率覆盖。 |
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

