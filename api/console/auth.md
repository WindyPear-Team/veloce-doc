# 认证控制台接口

认证接口用于登录页、注册页、Passkey 登录和 OIDC 跳转。

## POST `/auth/password/login`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `identifier` | Body | string | 是 | 用户名或邮箱。 |
| `password` | Body | string | 是 | 密码。 |
| `captcha_token` | Body | string | 否 | 验证码 token。 |
| `agreement_accepted` | Body | boolean | 视设置而定 | 是否同意协议。 |

返回：

```json
{
  "token": "jwt-token",
  "user": {}
}
```

## POST `/auth/password/register`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `username` | Body | string | 是 | 用户名。 |
| `email` | Body | string | 是 | 邮箱。 |
| `password` | Body | string | 是 | 密码。 |
| `email_code` | Body | string | 视设置而定 | 邮箱验证码。 |
| `captcha_token` | Body | string | 否 | 验证码 token。 |
| `referral_code` | Body | string | 否 | 邀请码；为空时后端会读取邀请 cookie。 |
| `agreement_accepted` | Body | boolean | 视设置而定 | 是否同意协议。 |

返回同登录接口。

## POST `/auth/password/email-code`

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `email` | Body | string | 是 | 注册邮箱。 |
| `captcha_token` | Body | string | 否 | 验证码 token。 |

返回：

```json
{
  "message": "Verification code sent"
}
```

## POST `/auth/passkey/login/options`

创建 Passkey 登录挑战。

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `identifier` | Body | string | 否 | 用户名或邮箱，具体取决于前端登录流程。 |

返回 WebAuthn 登录挑战对象。

## POST `/auth/passkey/login`

完成 Passkey 登录。

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| WebAuthn 响应 | Body | object | 是 | 浏览器 `navigator.credentials.get()` 返回值序列化结果。 |

返回同登录接口。

## GET `/auth/login`

发起 OIDC 登录。

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `ref` | Query | string | 否 | 邀请码，会写入 cookie。 |
| `agreement_accepted` | Query | boolean/string | 视设置而定 | 是否同意协议。 |

返回：重定向到 OIDC Provider。

## GET `/auth/callback`

OIDC 回调。

| 参数 | 位置 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| `code` | Query | string | 是 | OIDC authorization code。 |
| `state` | Query | string | 是 | OIDC state，必须匹配 cookie。 |

返回：重定向回前端并在 URL fragment 中携带 token。
