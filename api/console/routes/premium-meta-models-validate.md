# POST `/api/meta-models/validate`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/api/meta-models/validate` |
| 鉴权 | 管理员高级版 |

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

Meta Model DSL payload。

## 返回值

校验结果。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 元模型 ID。 |
| `name` | string | 元模型名称。 |
| `description` | string | 描述。 |
| `dsl` | string | Meta Model DSL。 |
| `provider` | string | 供应商 ID。 |
| `provider_name` | string | 展示供应商名称。 |
| `provider_icon_url` | string | 供应商图标。 |
| `expose_referenced_models` | boolean | 是否在公开模型列表暴露引用模型。 |
| `billing_mode` | string | actual 按真实模型计费，meta 按元模型自身价格计费。 |
| `input_price` | string/number | meta 计费输入价。 |
| `output_price` | string/number | meta 计费输出价。 |
| `cached_input_price` | string/number | meta 计费缓存读取价。 |
| `enabled` | boolean | 是否启用。 |
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

