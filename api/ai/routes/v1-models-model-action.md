# POST `/v1/models/:modelAction`

Gemini v1 兼容入口。

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `POST` |
| 路径 | `/v1/models/:modelAction` |
| 鉴权 | API Key 或登录 JWT |
| Content-Type | `application/json` |

## Header 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `Authorization` | 是 | `Bearer sk-...` 或 `Bearer <jwt>`。 |
| `x-api-key` | 否 | 可替代 `Authorization`。 |
| `Content-Type` | 是 | `application/json`。 |

## Path 参数

| 参数 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `modelAction` | 是 | string | Gemini 格式的模型和动作，例如 `gemini-pro:generateContent` 或 `gemini-pro:streamGenerateContent`。 |

## Query 参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `key` | 否 | 可替代 Header。 |

## Body 参数

| 参数 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `contents` | 是 | array | Gemini 内容数组。 |
| `contents[].role` | 否 | string | `user` 或 `model`。 |
| `contents[].parts` | 是 | array | 内容片段。 |
| `contents[].parts[].text` | 否 | string | 文本片段；计费文本会读取。 |
| `contents[].parts[].inlineData` | 否 | object | Gemini 图片/文件内联数据，透传。 |
| `contents[].parts[].fileData` | 否 | object | Gemini 文件数据，透传。 |
| `contents[].parts[].functionCall` | 否 | object | 函数调用，透传或协议转换。 |
| `contents[].parts[].functionResponse` | 否 | object | 函数响应，透传或协议转换。 |
| `systemInstruction` | 否 | object | Gemini 系统提示；计费文本会读取。 |
| `generationConfig` | 否 | object | 生成配置。 |
| `generationConfig.temperature` | 否 | number | 采样温度。 |
| `generationConfig.topP` | 否 | number | top-p。 |
| `generationConfig.topK` | 否 | integer | top-k。 |
| `generationConfig.maxOutputTokens` | 否 | integer | 最大输出 token。 |
| `generationConfig.stopSequences` | 否 | array | 停止序列。 |
| `safetySettings` | 否 | array | 安全设置，透传。 |
| `tools` | 否 | array | 工具定义，透传或协议转换。 |
| `toolConfig` | 否 | object | 工具配置，透传。 |

未列出的 Gemini 兼容字段也会保留并转发。

## 返回值

Gemini 响应：

```json
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          { "text": "Hello" }
        ]
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 1,
    "candidatesTokenCount": 1,
    "totalTokenCount": 2
  }
}
```
