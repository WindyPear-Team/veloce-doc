# GET `/api/user/payment/orders/:order_no`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/payment/orders/:order_no` |
| 鉴权 | 登录用户 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 否 | 无请求体时不需要。 |

## Path 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `order_no` | Path | string | 是 | 路径参数 `order_no`。 |

## Query 参数

无。

## Body 参数

无。

## 返回值

订单详情。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `order_no` | string | 订单号。 |
| `amount` | string | 到账余额金额。 |
| `rmb_amount` | string | 人民币支付金额。 |
| `method` | string | 支付方式。 |
| `status` | string | 订单状态：pending、paid。 |
| `payment_url` | string | 支付跳转 URL，仅创建订单时返回。 |
| `created_at` | string | 创建时间。 |
| `paid_at` | string | 支付完成时间，未支付时为空或缺省。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

