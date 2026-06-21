# 调用网关

网关对外提供与 OpenAI 高度兼容的接口，同时支持 Claude 与 Gemini 协议。本页聚焦最常用的 OpenAI 协议；其他协议见 [兼容协议](/guide/protocols)。

## 端点一览

所有端点都需要携带有效的 API 密钥。

| 方法 | 路径 | 用途 |
| --- | --- | --- |
| `GET` | `/v1/models` | 列出当前密钥可用的模型 |
| `POST` | `/v1/chat/completions` | 对话补全（主力接口） |
| `POST` | `/v1/completions` | 传统文本补全 |
| `POST` | `/v1/responses` | OpenAI Responses 协议 |
| `POST` | `/v1/images/generations` | 图像生成 |
| `POST` | `/v1/messages` | Claude Messages 协议 |
| `POST` | `/v1beta/models/{model}:{action}` | Gemini 协议 |

## 对话补全

```bash
curl https://your-platform.example.com/v1/chat/completions \
  -H "Authorization: Bearer sk-your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      { "role": "system", "content": "你是一个简洁的助手。" },
      { "role": "user", "content": "用一句话解释 token。" }
    ],
    "temperature": 0.7,
    "max_tokens": 200
  }'
```

请求体字段与 OpenAI 一致，网关原样转发给上游（必要时做协议转换）。`model` 必须是平台上配置且对你的密钥/分组开放的模型名。

## 流式响应

设置 `"stream": true` 返回标准 SSE 流：

```bash
curl https://your-platform.example.com/v1/chat/completions \
  -H "Authorization: Bearer sk-your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "stream": true,
    "messages": [{ "role": "user", "content": "数到五" }]
  }'
```

流式与非流式的计费一致，网关会从流中解析 usage 完成扣费。

## 图像生成

```bash
curl https://your-platform.example.com/v1/images/generations \
  -H "Authorization: Bearer sk-your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-image-model",
    "prompt": "一只在风梨树下的猫，水彩风格",
    "n": 1,
    "size": "1024x1024"
  }'
```

图像模型按平台配置的图像输入/输出价格计费。

## 列出模型

```bash
curl https://your-platform.example.com/v1/models \
  -H "Authorization: Bearer sk-your-key"
```

返回结果只包含：渠道、模型配置、模型、用户渠道均处于启用状态，且对当前密钥开放的模型。如果列表为空，通常说明管理员尚未配置可用模型，或你的密钥被「允许的模型 / 用户渠道」限制了。

## 错误响应

错误以 JSON 返回，常见状态码：

| 状态码 | 含义 |
| --- | --- |
| `400` | 请求体不合法，例如缺少 `model` 字段 |
| `401` | 缺少凭据或密钥无效（`Authorization is required` / `Invalid API key`） |
| `403` | 来源 IP 不允许，或密钥未正确绑定用户渠道 |
| `404` | 路径不存在 |
| `429` | 触发速率限制 |
| `5xx` | 上游或网关内部错误 |

## 请求体大小限制

网关对单次请求体有上限（默认 32 MiB）。超大请求会被拒绝；图像等大负载请注意压缩或改用 URL 引用方式。
