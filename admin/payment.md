# 支付与充值

平台支持在线充值，用户付款后余额自动到账。可选聚合网关 **易支付（Yipay）**、**OpenPayment**，也可直接对接官方渠道：**微信支付 API v3**、**支付宝**、**PayPal** 与 **Stripe**。

::: tip
OpenPayment 规范地址：[OpenPayment 规范地址](https://spec.flweb.cn/open-payment/)
:::


## 启用支付

在系统设置中开启 `支付开关`，并配置充值参数与网关。

回调路由：

- `GET/POST /api/payment/yipay/notify`（异步通知）
- `GET /api/payment/yipay/return`（同步返回）

## OpenPayment

通知与返回回调地址由平台根据站点 `base_url` 自动拼接：

- `/api/payment/openpayment/notify`
- `/api/payment/openpayment/return`
- 提交页：`GET /api/payment/openpayment/submit/:order_no`

::: tip base_url 很重要
OpenPayment 的回调地址依赖系统设置里的 `base_url`。务必把 `base_url` 设为平台对外可访问的 HTTPS 地址，否则回调无法正确生成。
:::

## 官方支付渠道

官方渠道只会在对应的后台异步通知验签成功后入账；浏览器回跳不会直接加余额。请将系统 `base_url` 配置成公网可访问的 HTTPS 地址，再在支付平台后台登记下列 webhook 地址。

| 渠道 | 后台配置 | 异步通知地址 | 说明 |
| --- | --- | --- | --- |
| 微信支付 | 商户号、AppID、商户证书序列号、商户私钥 PEM、平台证书/公钥 PEM、API v3 密钥 | `/api/payment/wechatpay/notify` | 使用 Native 下单，返回微信扫码链接；结算币种固定为 `CNY`。 |
| 支付宝 | AppID、应用私钥 PEM、支付宝公钥 PEM、网关地址 | `/api/payment/alipay/notify` | 使用电脑网站支付 `alipay.trade.page.pay` 与 RSA2 验签。 |
| PayPal | Client ID、Client Secret、Webhook ID、API Base URL | `/api/payment/paypal/notify` | 默认 Base URL 是 Sandbox；生产环境改为 `https://api-m.paypal.com`。 |
| Stripe | Secret Key、Webhook Signing Secret | `/api/payment/stripe/notify` | 使用 Stripe Checkout；在 Stripe webhook 中订阅 `checkout.session.completed`。 |

PayPal 和 Stripe 可将“官方结算币种”设为 `USD`；微信支付必须使用 `CNY`。创建订单时，系统会固化订单的渠道币种与金额，避免汇率设置改动影响之后的回调校验。

## 充值流程

1. 用户在钱包页创建订单（`POST /api/user/payment/orders`），平台按汇率换算人民币金额并生成订单号；
2. 跳转到所选网关支付；
3. 网关异步通知（notify）到达后，平台校验签名、把订单标记为成功并给用户加余额；
4. 用户可查询订单：`GET /api/user/payment/orders`、`GET /api/user/payment/orders/:order_no`。

## 订单状态

| 状态 | 含义 |
| --- | --- |
| `pending` | 待支付 |
| 成功 | 已支付，余额已入账 |
| 失败/过期 | 未完成 |

## 排查

- **付了款余额没到**：检查回调地址是否可被网关访问、签名密钥是否正确、`base_url` 是否设对；查看订单的 notify 记录；
- **金额对不上**：核对 `payment_usd_to_rmb_rate`；
- **支付方式不显示**：检查 `payment_methods` 与网关是否开通对应通道。
