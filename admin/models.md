# 模型管理

**模型（Model）** 是对用户暴露的全局模型身份，它不绑定具体渠道。模型与渠道通过 **模型配置（ModelConfig）** 关联。

## 概念回顾

```
Model(全局模型 gpt-4o)
   │ 各维度价格、供应商、图标
   └─< ModelConfig >─ Channel(渠道A，上游名 gpt-4o-2024-08-06)
   └─< ModelConfig >─ Channel(渠道B，上游名 gpt-4o)
```

- **Model**：定义模型名、价格、供应商；
- **ModelConfig**：定义「某渠道用什么上游模型名提供这个全局模型」；
- 一个全局模型可由多个渠道提供，网关据此路由。

## 模型价格字段

价格单位均为**每百万 token**，支持分项与阶梯：

| 字段 | 说明 |
| --- | --- |
| `input_price` | 输入 |
| `output_price` | 输出 |
| `cached_input_price` | 缓存命中的输入 |
| `cache_write_input_price` | 缓存写入 |
| `cache_write_1h_input_price` | 1 小时缓存写入 |
| `image_input_price` / `image_output_price` | 图像 |
| `audio_input_price` / `audio_output_price` | 音频 |
| `*_price_tiers` | 上述各项对应的**阶梯价格**列表 |

`provider` / `provider_icon_url` 用于在模型目录中展示供应商与图标。平台内置了常见供应商预设，也会根据模型名推断（如名字含 `claude` 推断为 Claude，含 `gemini`/`palm`/`bison` 推断为 Gemini，其余默认 OpenAI）。

## 管理操作

| 操作 | 接口 |
| --- | --- |
| 列表 | `GET /models` |
| 创建 | `POST /models` |
| 更新 | `PUT /models/:id` |
| 删除 | `DELETE /models/:id` |
| 同步（预览/应用） | `POST /models/sync/preview`、`/models/sync/apply` |
| 价格同步 | `POST /models/prices/sync/preview`、`/models/prices/sync/apply` |
| 渠道下模型配置列表 | `GET /channels/:id/models` |
| 创建模型配置 | `POST /channels/:id/models` |
| 更新模型配置 | `PUT /channel-models/:id` |
| 删除模型配置 | `DELETE /channel-models/:id` |
| 模型配置分组倍率 | `PUT /channel-models/:id/group-multipliers` |

## 上线一个模型

1. **创建全局模型**，填写模型名与各维度价格；
2. 在某个渠道下**创建模型配置**，指定该渠道的上游模型名（`upstream_model_name`）；
3. 确保模型、模型配置、渠道、用户渠道**都启用**；
4. 用户即可在 `GET /v1/models` 和模型目录中看到它。

::: tip 上游名与对外名解耦
对外模型名（如 `gpt-4o`）与上游真实名（如 `gpt-4o-2024-08-06`）可以不同。这样你可以统一对外命名，同时不同渠道指向不同的上游版本。
:::

## 阶梯价格

阶梯价格允许按累计 token 量或条件，对不同区间适用不同单价（`PriceTierList`，以 JSON 存储）。结算时网关会按命中的阶梯计算费用。设计阶梯时注意区间连续、不留空档。

## 公开模型目录

`GET /api/public/models` 返回对外的模型目录（含价格、供应商、所涉用户渠道）。专业版的 Meta Model 也可能出现在目录中并带有 `is_meta_model` 标记，详见 [Meta Model DSL](/develop/meta-model-dsl)。
