# 支付回调接口

支付回调接口由支付平台或浏览器回跳访问，不使用登录鉴权。签名校验和订单状态更新在后端完成。

## 易支付

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/payment/yipay/return` | 支付平台回跳参数，如 `out_trade_no`、`trade_no`、`money`、`sign`。 | 无 | 浏览器重定向到钱包页。 |
| `GET` | `/api/payment/yipay/notify` | 支付平台通知参数。 | 无 | 文本成功/失败响应。 |
| `POST` | `/api/payment/yipay/notify` | 支付平台通知参数。 | 表单或支付平台提交字段。 | 文本成功/失败响应。 |

## OpenPayment

| 方法 | 路径 | 参数 | 请求体 | 返回值 |
| --- | --- | --- | --- | --- |
| `GET` | `/api/payment/openpayment/return` | 支付平台回跳参数，如商户订单号、平台订单号、金额、签名。 | 无 | 浏览器重定向到钱包页。 |
| `GET` | `/api/payment/openpayment/notify` | 支付平台通知参数。 | 无 | 文本成功/失败响应。 |
| `POST` | `/api/payment/openpayment/notify` | 支付平台通知参数。 | 表单或支付平台提交字段。 | 文本成功/失败响应。 |
| `GET` | `/api/payment/openpayment/submit/:order_no` | Path: `order_no`。 | 无 | HTML 提交页或错误文本。 |

## 官方渠道通知

| 渠道 | 方法 | 路径 | 校验方式 | 成功响应 |
| --- | --- | --- | --- | --- |
| 微信支付 API v3 | `POST` | `/api/payment/wechatpay/notify` | 平台证书 RSA 签名 + API v3 AES-GCM 解密 | JSON `{"code":"SUCCESS"}` |
| 支付宝 | `POST` | `/api/payment/alipay/notify` | 支付宝公钥 RSA2 验签 | `success` |
| PayPal | `POST` | `/api/payment/paypal/notify` | PayPal `verify-webhook-signature` API | `success` |
| Stripe | `POST` | `/api/payment/stripe/notify` | `Stripe-Signature` HMAC-SHA256 | `success` |

支付宝、PayPal、Stripe 的浏览器回跳统一到 `/api/payment/<provider>/return`，只跳转回钱包页，绝不以回跳参数作为入账依据。

## 返回值

通知接口成功时返回支付平台要求的成功文本；失败时返回 `fail` 或错误文本。

浏览器回跳接口会重定向到：

```text
/dashboard/wallet?payment=<status>&order_no=<order_no>
```
