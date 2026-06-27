# AI 模型接口

模型接口用于查询当前凭据可以调用的模型列表。返回格式兼容 OpenAI `/v1/models`，客户端通常可以直接把本项目网关配置为 OpenAI Compatible Provider。

## 路由

| 路由 | 说明 |
| --- | --- |
| [GET /v1/models](/api/ai/routes/v1-models) | 列出当前凭据可访问的模型。 |

## 使用场景

| 场景 | 说明 |
| --- | --- |
| 客户端模型选择 | 给 ChatBox、Cherry Studio、Dify、AnythingLLM 等客户端加载可选模型。 |
| 权限排查 | 验证当前凭据是否绑定了正确用户、分组和模型权限。 |
| 价格展示 | 前端可结合控制台公开模型接口展示倍率、价格和上下文信息。 |

## 相关接口

| 分类 | 文档 |
| --- | --- |
| AI 全路由 | [AI API 全路由](/api/ai/) |
| 控制台公开模型 | [GET /public/models](/api/console/routes/public-models) |
| 用户模型目录 | [GET /user/catalog](/api/console/routes/user-catalog) |
