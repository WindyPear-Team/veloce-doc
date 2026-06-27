# GET `/api/user/payment/config`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/api/user/payment/config` |
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

支付配置。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `enabled` | boolean | 支付充值是否启用。 |
| `currency_display_name` | string | 前端显示的币种符号。 |
| `usd_to_rmb_rate` | string | 美元到账额度到人民币支付金额的汇率。 |
| `min_recharge_amount` | string | 最小充值额度。 |
| `recharge_presets` | array | 预设充值额度字符串数组。 |
| `methods` | array | 启用的支付方式，例如 alipay、wxpay。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

