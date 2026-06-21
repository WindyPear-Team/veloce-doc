# 兼容协议

网关同时对外暴露三套主流协议入口，客户端可以用各自熟悉的 SDK 接入。网关内部会按需把客户端协议转换为上游渠道的协议（例如客户端用 Claude 协议，上游是 OpenAI 渠道时自动转换）。

## OpenAI 协议

最常用，入口在 `/v1` 前缀下。直接把 `base_url` 指向 `https://your-platform.example.com/v1`，用 `Authorization: Bearer sk-...` 认证。

```python
from openai import OpenAI
client = OpenAI(api_key="sk-your-key",
                base_url="https://your-platform.example.com/v1")
client.chat.completions.create(model="gpt-4o", messages=[...])
```

支持 `/chat/completions`、`/completions`、`/responses`、`/images/generations`。

## Claude（Anthropic Messages）协议

入口为 `POST /v1/messages`，认证使用 `x-api-key`，与 Anthropic SDK 兼容。

```python
import anthropic
client = anthropic.Anthropic(
    api_key="sk-your-key",
    base_url="https://your-platform.example.com",
)
client.messages.create(
    model="claude-sonnet-4",
    max_tokens=1024,
    messages=[{"role": "user", "content": "你好"}],
)
```

::: tip
即使后端上游是 OpenAI 类型渠道，只要平台为该模型配置了渠道，网关也能把 Claude 协议请求转换过去。具体可用模型以平台配置为准。
:::

## Gemini 协议

入口为 `POST /v1beta/models/{model}:{action}`（也支持 `/v1/models/...`），认证使用查询参数 `?key=sk-...`，与 Google 官方 SDK 的调用形式一致。

```bash
curl "https://your-platform.example.com/v1beta/models/gemini-pro:generateContent?key=sk-your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{ "parts": [{ "text": "你好" }] }]
  }'
```

其中 `{action}` 通常是 `generateContent` 或 `streamGenerateContent`。

## 认证方式对照

不同协议的客户端习惯不同的密钥传递方式，网关三种都接受，互不冲突：

| 协议 | 习惯方式 | 网关请求头/参数 |
| --- | --- | --- |
| OpenAI | Bearer Token | `Authorization: Bearer sk-...` |
| Claude | API Key 头 | `x-api-key: sk-...` |
| Gemini | URL 参数 | `?key=sk-...` |

你也可以混用，例如用 Bearer 调 Claude 端点，只要密钥有效即可。

## 协议转换说明

- 网关根据**请求入口**判断客户端协议，根据**目标模型所在渠道的类型**判断上游协议；
- 两者不一致时执行转换（请求体与响应体双向转换，包括流式）；
- 计费始终以最终命中的真实模型与其 usage 为准，与使用哪套协议无关。
