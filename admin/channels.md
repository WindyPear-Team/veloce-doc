# 渠道管理

**渠道（Channel）** 是一个上游 AI 供应商的接入点。平台通过渠道把请求转发给真正的 AI 服务（OpenAI 兼容服务、Claude 服务等）。

## 渠道字段

| 字段 | 说明 |
| --- | --- |
| **名称** | 渠道显示名 |
| **类型** | `openai` 或 `claude`，决定与上游通信的协议 |
| **BaseURL** | 上游 API 基础地址 |
| **APIKey** | 调用上游所用的密钥 |
| **优先级（Priority）** | 路由时数值越高/越靠前越优先（取决于路由算法） |
| **权重（Weight）** | 加权路由时的权重 |
| **倍率（Multiplier）** | 该渠道的计费倍率 |
| **用户渠道** | 该渠道归属的用户渠道（供给分层） |
| **启用状态** | 关闭后不参与路由 |

## 管理操作

对应接口（`/api` 前缀，需管理员）：

| 操作 | 接口 |
| --- | --- |
| 列表 | `GET /channels` |
| 创建 | `POST /channels` |
| 更新 | `PUT /channels/:id` |
| 删除 | `DELETE /channels/:id` |
| 设置分组倍率 | `PUT /channels/:id/group-multipliers` |
| 查看渠道下模型 | `GET /channels/:id/models` |
| 为渠道添加模型 | `POST /channels/:id/models` |
| 同步 | `POST /channels/sync` |

## 接入一个上游

1. **新建渠道**，选择类型（如 `openai`）；
2. 填写上游 `BaseURL` 与 `APIKey`；
3. 选择/创建所属 **用户渠道**；
4. 设置优先级、权重、倍率；
5. 保存并启用。

接下来需要在 [模型管理](/admin/models) 把全局模型绑定到该渠道（创建 ModelConfig），渠道才能真正提供模型。

## 模型同步

平台支持从上游拉取可用模型列表，减少手工录入：

- **预览同步**：`POST /channels/sync`、`POST /models/sync/preview` 等接口会先抓取上游模型清单，生成预览，确认后再应用；
- **从浏览器粘贴**：`.../preview/browser` 系列接口支持把你在浏览器里拿到的上游响应体直接粘贴进来生成预览，适合上游有访问限制、服务器侧不便直连的情况；
- **应用同步**：确认预览后 `POST /models/sync/apply` 写入；
- **价格同步**：`POST /models/prices/sync/preview` 与 `.../apply` 可单独同步价格。

平台还会启动一个后台同步循环，定期尝试同步价格（具体周期以实现为准）。

## 渠道分组倍率

除了渠道自身的倍率，你还可以为「渠道 × 分组」设置更细的倍率（`PUT /channels/:id/group-multipliers`），让不同分组的用户走同一渠道时承担不同价格。倍率如何合并见 [分组与倍率](/admin/groups-and-multipliers)。

::: warning 上游密钥安全
渠道里保存的上游 `APIKey` 是高价值凭据。确保数据库文件与备份的访问受控，不要把它暴露给非管理员。
:::
