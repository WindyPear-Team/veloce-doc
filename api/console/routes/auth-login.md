# GET `/auth/login`

## 请求

| 项 | 内容 |
| --- | --- |
| 方法 | `GET` |
| 路径 | `/auth/login` |
| 鉴权 | 公开 |

## Header 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `Authorization` | Header | string | 否 | 公开接口无需鉴权。 |
| `Content-Type` | Header | string | 否 | 无请求体时不需要。 |

## Path 参数

无。

## Query 参数

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `ref` | Query | string | 否 | 请求字段。 |
| `agreement_accepted` | Query | boolean | 否 | 是否同意用户协议。 |

## Body 参数

无。

## 返回值

重定向到 OIDC Provider。

## 返回字段

该接口返回 `302 Found` 跳转到 OIDC Provider 授权地址；没有 JSON 响应体。

| Header | 类型 | 说明 |
| --- | --- | --- |
| `Location` | string | OIDC 登录授权 URL。 |

## 错误

| 状态码 | 说明 |
| --- | --- |
| `400` | 参数不合法。 |
| `401` | 未登录或登录失效。 |
| `403` | 无权限。 |
| `404` | 资源不存在。 |
| `500` | 服务端错误。 |


