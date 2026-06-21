# 快速开始

本页帮助你以最快的速度调用平台 API。如果你是平台管理员，想从零部署一套服务，请看 [安装部署](/admin/installation)。

## 前提

- 你已经在目标平台注册了账户并完成登录；
- 你的账户里有可用余额（可通过 [充值](/guide/wallet) 或 [签到](/guide/checkin-and-referral) 获得）；
- 平台管理员已经配置好至少一个可用模型。

## 第 1 步：创建 API 密钥

登录后进入 **API 密钥** 页面，点击创建，得到一个以 `sk-` 开头的密钥。请妥善保存，密钥仅在创建时完整展示一次。

详见 [管理 API 密钥](/guide/api-keys)。

## 第 2 步：找到网关地址

网关基础地址就是平台域名，例如：

```
https://your-platform.example.com
```

OpenAI 兼容入口位于 `/v1` 前缀下。

## 第 3 步：发起第一次请求

把平台当作 OpenAI 的替代端点即可，只需替换 `base_url` 和 `api_key`。

::: code-group

```bash [cURL]
curl https://your-platform.example.com/v1/chat/completions \
  -H "Authorization: Bearer sk-your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      { "role": "user", "content": "你好，介绍一下你自己" }
    ]
  }'
```

```python [Python (openai SDK)]
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://your-platform.example.com/v1",
)

resp = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "你好，介绍一下你自己"}],
)
print(resp.choices[0].message.content)
```

```javascript [Node.js]
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-your-key",
  baseURL: "https://your-platform.example.com/v1",
});

const resp = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "你好，介绍一下你自己" }],
});
console.log(resp.choices[0].message.content);
```

:::

::: tip 认证方式
网关接受三种方式传递密钥：
- `Authorization: Bearer sk-...`（推荐，兼容 OpenAI SDK）
- `x-api-key: sk-...`（兼容 Claude SDK）
- URL 查询参数 `?key=sk-...`（兼容 Gemini SDK）
:::

## 第 4 步：查看可用模型

```bash
curl https://your-platform.example.com/v1/models \
  -H "Authorization: Bearer sk-your-key"
```

返回的模型列表会根据你的密钥 **允许模型** 设置过滤。也可以在网页的「模型目录」中浏览模型与价格。

## 第 5 步：流式输出

在请求体里加 `"stream": true` 即可获得 SSE 流式响应，与 OpenAI 行为一致：

```bash
curl https://your-platform.example.com/v1/chat/completions \
  -H "Authorization: Bearer sk-your-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "stream": true,
    "messages": [{ "role": "user", "content": "写一首关于风梨的短诗" }]
  }'
```

## 下一步

- 想接入 Claude / Gemini 客户端？看 [兼容协议](/guide/protocols)
- 想了解费用怎么算？看 [模型与定价](/guide/models-and-pricing)
- 想限制密钥权限？看 [管理 API 密钥](/guide/api-keys)
