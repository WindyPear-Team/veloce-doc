# 支付与充值

平台支持在线充值，用户付款后余额自动到账。是否开启由系统设置 `payment_enabled` 控制，支付网关二选一：**易支付（Yipay）** 或 **OpenPayment**。

## 启用支付

在系统设置中开启 `payment_enabled`，并配置充值参数与网关。

### 充值参数

| 设置键 | 默认 | 说明 |
| --- | --- | --- |
| `payment_currency_display_name` | `$` | 余额显示符号 |
| `payment_usd_to_rmb_rate` | `7.20` | 平台货币兑人民币汇率，用于把充值金额换算成实付人民币 |
| `payment_min_recharge_amount` | `1` | 最低充值金额 |
| `payment_recharge_presets` | `["5","10","20","50","100"]` | 充值档位预设 |
| `payment_methods` | `["alipay","wxpay"]` | 展示给用户的支付方式 |
| `payment_gateway_provider` | `yipay` | 使用的网关：`yipay` 或 `openpayment` |

## 易支付（Yipay）

| 设置键 | 说明 |
| --- | --- |
| `payment_yipay_gateway_url` | 易支付网关地址 |
| `payment_yipay_pid` | 商户 PID |
| `payment_yipay_key` | 商户密钥 |
| `payment_yipay_notify_url` | 异步通知回调地址 |
| `payment_yipay_return_url` | 同步跳转回调地址 |

回调路由：

- `GET/POST /api/payment/yipay/notify`（异步通知）
- `GET /api/payment/yipay/return`（同步返回）

## OpenPayment

| 设置键 | 说明 |
| --- | --- |
| `payment_openpayment_base_url` | OpenPayment 基础地址 |
| `payment_openpayment_config_url` | 配置地址 |
| `payment_openpayment_merchant_id` | 商户 ID |
| `payment_openpayment_key` | 商户密钥 |

通知与返回回调地址由平台根据站点 `base_url` 自动拼接：

- `/api/payment/openpayment/notify`
- `/api/payment/openpayment/return`
- 提交页：`GET /api/payment/openpayment/submit/:order_no`

::: tip base_url 很重要
OpenPayment 的回调地址依赖系统设置里的 `base_url`。务必把 `base_url` 设为平台对外可访问的 HTTPS 地址，否则回调无法正确生成。
:::

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
