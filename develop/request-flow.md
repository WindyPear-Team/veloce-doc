# 请求处理流程

本页描述一次网关请求从进入到计费的完整路径，对应代码主要在 `internal/middleware/auth.go` 与 `internal/service/proxy.go`。

## 总体时序

```
客户端
  │  POST /v1/chat/completions  (Bearer sk-... | x-api-key | ?key=)
  ▼
[请求体大小限制] maxRequestBodyBytes = 32 MiB
  ▼
[AuthMiddleware]
  ├─ token 以 sk- 开头 → API Key 认证（含 IP 限制）
  └─ 否则 → JWT 会话认证（后台用）
  ▼
[RateLimiter] 命中限流 → 429
  ▼
[Proxy handler] 解析 body，取 model
  ├─ 命中 Meta Model（专业版 Hook）→ 解析 DSL，改写为真实模型
  ▼
[resolveTarget] 选渠道、校验权限/余额/额度
  ▼
[协议转换] 客户端协议 → 上游协议（如需要）
  ▼
[forwardToUpstream] 转发到上游（流式 / 非流式）
  ▼
[解析 usage] 计算费用
  ▼
[billUsage] 扣余额、写 TokenLog、返佣
  ▼
返回响应给客户端
```

## 1. 认证

`tokenFromRequest` 按顺序取凭据：

1. `Authorization: Bearer <token>`；
2. `x-api-key: <token>`；
3. 查询参数 `?key=<token>`。

随后 `AuthMiddleware`：

- token 以 `sk-` 开头 → 走 `FindUserByAPIKey`，校验密钥有效性与来源 IP（IP 不允许返回 `403`），把 `api_key` 与 `user` 写入上下文；
- 否则按 JWT 处理（后台会话），校验后载入用户。

## 2. 限流

`RateLimiter.Middleware()` 应用于 `/v1`、`/v1beta`。具体算法由注册的限流工厂决定，命中返回 `429`。

## 3. 解析与 Meta Model

Proxy handler 读取 JSON body，取 `model` 字段（缺失返回 `400`）。若该名字命中专业版注册的 **Meta Model**，`ResolveMetaModel` 会按 DSL 选出真实模型并改写请求模型，必要时设置 `skip_api_key_model_check`。详见 [Meta Model DSL](/develop/meta-model-dsl)。

## 4. 解析目标渠道（resolveTarget）

这是路由与准入的核心，依次：

1. 取上下文中的 `user`，无则 `401`；
2. 规整模型名（去掉 `models/` 前缀）；
3. **密钥模型权限**：除非 `skip_api_key_model_check`，校验密钥是否允许该模型，不允许返回 `403`；
4. 查询候选 `ModelConfig`：要求 channel、model_config、model、user_channel **全部 enabled** 且模型名匹配；
5. **密钥用户渠道约束**：密钥若绑定用户渠道，则候选限制在该用户渠道内（绑定不唯一时 `403`）；
6. 候选按 `channels.priority DESC, channels.weight DESC, channels.id ASC` 排序，再由 `selectModelConfig` 按用户渠道的路由算法（priority/weight/轮询）最终选定；
7. 无候选返回 `503 No available channel for this model`；
8. **余额检查**：余额 ≤ 0 返回 `402 Insufficient balance`；
9. **密钥额度检查**：超额返回 `402 API key quota exceeded`。

返回的 `proxyTarget` 含用户、密钥、模型名、模型配置、渠道。

## 5. 协议转换与转发

- 根据入口判定客户端协议（OpenAI / Responses / Claude / Gemini）；
- 根据目标渠道 `Type`（`openai` / `claude`）判定上游协议；
- 不一致时双向转换（含流式 SSE）；
- `forwardToUpstream` 用渠道的 `BaseURL` 与上游 `APIKey` 发起请求；
- 流式响应通过 `streamUpstreamResponse` 边转发边收集，用于解析 usage。

## 6. 计费

`billUsage`：

1. 从响应/流中解析各维度 token（`usageTokenCounts`）；
2. `calculateModelUsageCost` 按模型各维度单价与阶梯价算基础费用；
3. 乘以有效分组倍率、用户渠道倍率得到最终费用；
4. 事务内 `ApplyUsageCharge` 扣余额（默认实现保证余额充足才扣，否则 `ErrInsufficientBalance`；专业版可注入订阅计费 Hook）；
5. 写入 `TokenLog`；
6. 若开启邀请返佣，`applyReferralCommission` 给邀请人返佣并记 `ReferralCommissionLog`。

计费维度与公式见 [计费体系](/admin/billing)。

## 错误码小结

| 场景 | 状态码 |
| --- | --- |
| 缺少凭据 / 密钥无效 / 会话无效 | `401` |
| 模型不允许 / IP 不允许 / 用户渠道绑定异常 | `403` |
| 余额不足 / 额度超限 | `402` |
| 无可用渠道 | `503` |
| body 不合法（缺 model 等） | `400` |
| 限流 | `429` |
