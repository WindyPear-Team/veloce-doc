# POST `/api/models/sync/preview`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/models/sync/preview` |
| 鉴权 | 管理员 |

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
| `channel_id` | Body | number | 是 | 渠道 ID。 |
| `format` | Body | string | 是 | 同步格式。 |
| `path` | Body | string | 否 | 自定义同步路径。 |

## 返回值

预览结果。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `channel_id` | number | 来源上级渠道 ID。 |
| `channel_name` | string | 来源上级渠道名称。 |
| `source` | string | 同步来源。 |
| `models` | array | 可同步模型数组。 |
| `models[].model_name` | string | 模型名。 |
| `models[].quota_type` | number | 计费类型。 |
| `models[].input_price` | string/number | 输入价格。 |
| `models[].output_price` | string/number | 输出价格。 |
| `models[].cached_input_price` | string/number | 缓存读取价格。 |
| `models[].provider` | string | 供应商 ID。 |
| `models[].provider_name` | string | 供应商显示名。 |
| `models[].provider_icon_url` | string | 供应商图标。 |
| `models[].exists` | boolean | 平台是否已有该模型。 |
| `models[].*_price_tiers` | array | 各类分段价格。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

