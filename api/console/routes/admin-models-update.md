# PUT `/api/models/:id`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `PUT` |
| 路径 | `/api/models/:id` |
| 鉴权 | 管理员 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 是 | `Bearer <jwt>`。 |
| `Content-Type` | Header | string | 是 | `application/json`。 |

## Path 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | Path | string | 是 | 路径参数 `id`。 |

## Query 参数

无。

## Body 参数

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `model_name` | string | 创建时必填；平台模型名。 |
| `provider` | string | 供应商 ID，留空时按模型名自动识别。 |
| `provider_icon_url` | string | 供应商图标 URL。 |
| `quota_type` | number | 0 token，1 按次，100 视频分辨率和时长组合。 |
| `input_price` | string/number | 输入价格，按 1M token。 |
| `output_price` | string/number | 输出价格，按 1M token。 |
| `cached_input_price` | string/number | 缓存读取输入价格。 |
| `cache_write_input_price` | string/number | 缓存写入输入价格。 |
| `cache_write_1h_input_price` | string/number | 1 小时缓存写入输入价格。 |
| `image_input_price` | string/number | 图像输入价格。 |
| `image_output_price` | string/number | 图像输出价格。 |
| `audio_input_price` | string/number | 音频输入价格。 |
| `audio_output_price` | string/number | 音频输出价格。 |
| `*_price_tiers` | array | 对应计价项的分段价格数组，元素为 { min_tokens, price, condition }。 |
| `video_billing_config` | object | quota_type=100 时使用；按分辨率和时长组合计费。 |
| `video_billing_config.resolutions` | array | 分辨率档位数组。 |
| `video_billing_config.resolutions[].resolution` | string | 分辨率值。 |
| `video_billing_config.resolutions[].duration_unit_price` | string/number | 该分辨率下无固定时长选项时的每秒单价。 |
| `video_billing_config.resolutions[].durations` | array | 固定时长档位；存在时只允许这些时长。 |
| `video_billing_config.resolutions[].durations[].seconds` | number | 时长秒数。 |
| `video_billing_config.resolutions[].durations[].price` | string/number | 该分辨率和时长组合的价格。 |
| `enabled` | boolean | 是否启用。 |

## 返回值

更新后的模型。

## 返回字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | number | 全局模型 ID。 |
| `model_name` | string | 平台模型名。 |
| `provider` | string | 供应商 ID。 |
| `provider_icon_url` | string | 供应商图标 URL。 |
| `quota_type` | number | 计费类型：0 token，1 按次，100 视频分辨率和时长组合。 |
| `input_price` | string/number | 输入 token 单价，按 1M token。 |
| `output_price` | string/number | 输出 token 单价，按 1M token。 |
| `cached_input_price` | string/number | 缓存读取输入单价，按 1M token。 |
| `cache_write_input_price` | string/number | 缓存写入输入单价，按 1M token。 |
| `cache_write_1h_input_price` | string/number | 1 小时缓存写入输入单价，按 1M token。 |
| `image_input_price` | string/number | 图像输入单价。 |
| `image_output_price` | string/number | 图像输出单价。 |
| `audio_input_price` | string/number | 音频输入单价。 |
| `audio_output_price` | string/number | 音频输出单价。 |
| `input_price_tiers` | array | 输入分段价格，元素为 { min_tokens, price, condition }。 |
| `output_price_tiers` | array | 输出分段价格，元素为 { min_tokens, price, condition }。 |
| `cached_input_price_tiers` | array | 缓存读取分段价格。 |
| `cache_write_input_price_tiers` | array | 缓存写入分段价格。 |
| `cache_write_1h_input_price_tiers` | array | 1 小时缓存写入分段价格。 |
| `image_input_price_tiers` | array | 图像输入分段价格。 |
| `image_output_price_tiers` | array | 图像输出分段价格。 |
| `audio_input_price_tiers` | array | 音频输入分段价格。 |
| `audio_output_price_tiers` | array | 音频输出分段价格。 |
| `video_billing_config` | object | 视频组合计费配置，见下方结构。 |
| `video_billing_config.resolutions` | array | 分辨率档位数组。 |
| `video_billing_config.resolutions[].resolution` | string | 允许的分辨率，例如 720p、1080p、1920x1080。 |
| `video_billing_config.resolutions[].duration_unit_price` | string/number | 该分辨率下未限定时长选项时的每秒单价。 |
| `video_billing_config.resolutions[].durations` | array | 该分辨率下允许的时长档位；存在时按档位固定价计费。 |
| `video_billing_config.resolutions[].durations[].seconds` | number | 时长秒数。 |
| `video_billing_config.resolutions[].durations[].price` | string/number | 该分辨率和该时长组合的价格。 |
| `enabled` | boolean | 是否启用。 |
| `created_at` | string | 创建时间。 |
| `updated_at` | string | 更新时间。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |

