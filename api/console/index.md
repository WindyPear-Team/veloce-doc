# 控制台 API

控制台 API 是前端后台、用户中心、钱包、模型配置页实际使用的接口。开发者如果要自己实现一个控制台，建议按下面的模块接入。

## 鉴权和基础路径

前端 API client 通常以 `/api` 作为 base URL。例如 `GET /api/user/me` 在代码里写作 `api.get("/user/me")`。

| 类型 | Header |
| --- | --- |
| 未登录公共接口 | 不需要鉴权。 |
| 登录用户接口 | `Authorization: Bearer <jwt>` |
| 管理员接口 | `Authorization: Bearer <jwt>`，且用户必须是管理员。 |

## 控制台页面和接口

| 页面 | 文档 |
| --- | --- |
| 启动、公共配置、公开模型、状态页 | [公共控制台接口](/api/console/public) |
| 登录、注册、Passkey、OIDC | [认证控制台接口](/api/console/auth) |
| 用户首页、目录、日志、钱包、签到、API Key、设置 | [用户控制台接口](/api/console/user) |
| 系统设置、渠道、模型、用户、统计 | [管理员控制台接口](/api/console/admin) |
| 高级版订阅、Meta Model、高级聊天、Agent、Skill | [高级版控制台接口](/api/console/premium) |

## 通用列表响应

部分接口在带分页参数时返回：

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "page_size": 20
}
```

## 通用错误

```json
{
  "error": "message"
}
```
