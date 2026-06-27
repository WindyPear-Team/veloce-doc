# 图片接口

图片接口采用 OpenAI 风格路径，对上游图片模型做统一转发和计费。参考 APIMart 的图片文档组织方式，本项目把文生图和图片编辑拆成两个入口，模型差异通过 `model` 和透传字段控制。

## 路由

| 路由 | 说明 |
| --- | --- |
| [POST /v1/images/generations](/api/ai/routes/v1-images-generations) | OpenAI 风格图片生成接口。 |
| [POST /v1/images/edits](/api/ai/routes/v1-images-edits) | OpenAI 风格图片编辑接口。 |

## 调用要点

| 项 | 说明 |
| --- | --- |
| 模型选择 | `model` 必填，填写平台模型名。 |
| 返回格式 | 按上游支持返回 URL、base64 或其他兼容结构。 |
| 计费 | 优先读取上游 `usage`；没有 `usage` 时按返回图片数量估算。 |
| 透传字段 | 未列出的图片模型字段会尽量保留并转发。 |

## APIMart 能力映射

| APIMart 图片能力 | 本项目入口 |
| --- | --- |
| GPT Image、Gemini Image、Qwen Image、Seedream、Imagen 等文生图 | `POST /v1/images/generations`，通过 `model` 路由到对应上游。 |
| 图片编辑、参考图、遮罩、重绘 | `POST /v1/images/edits`，按上游协议字段透传。 |
| Midjourney 专用动作 | 当前没有独立 Midjourney 路由；如上游模型支持，可通过兼容字段转发。 |
