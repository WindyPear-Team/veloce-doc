import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Veloce',
  description: 'API 网关与 AI Agent · 用户文档与开发文档',
  lastUpdated: true,
  cleanUrls: true,
  srcExclude: ['README.md'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }]
  ],

  themeConfig: {
    logo: '/favicon.svg',

    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '定价', link: '/buy' },
      { text: '管理员手册', link: '/admin/overview' },
      { text: 'API', link: '/api/' },
      { text: '开发文档', link: '/develop/architecture' },
      {
        text: '参考',
        items: [
          { text: 'API 参考', link: '/develop/api-reference' },
          { text: 'Meta Model DSL', link: '/develop/meta-model-dsl' },
        ]
      },
      {
        text: '相关链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/WindyPear-Team/veloce' },
          { text: '专业版', link: '/buy' }
        ]
      }
    ],

    sidebar: {
      '/api/': [
        {
          text: '社区版接口',
          items: [
            { text: '总览', link: '/api/' },
            { text: '公开接口', link: '/api/public' },
            { text: '支付回调', link: '/api/payment' },
            { text: '认证接口', link: '/api/auth' },
            { text: 'AI 网关', link: '/api/gateway' },
            { text: '管理员接口', link: '/api/admin' },
            { text: '用户接口', link: '/api/user' }
          ]
        },
        {
          text: 'AI 接口',
          items: [
            { text: 'AI 全路由', link: '/api/ai/' },
            { text: '账户与额度', link: '/api/ai/account' },
            { text: '模型列表', link: '/api/ai/models' },
            { text: 'OpenAI Chat / Completions', link: '/api/ai/openai-chat' },
            { text: 'OpenAI Responses', link: '/api/ai/responses' },
            { text: '音频接口', link: '/api/ai/audio' },
            { text: '审核接口', link: '/api/ai/moderations' },
            { text: '上传接口', link: '/api/ai/uploads' },
            { text: '图片接口', link: '/api/ai/images' },
            { text: 'Seedream 图片', link: '/api/ai/images-seedream' },
            { text: 'Midjourney', link: '/api/ai/midjourney' },
            { text: 'OpenAI 风格视频', link: '/api/ai/video-openai' },
            { text: 'Veo 视频', link: '/api/ai/video-veo' },
            { text: 'Seedance 视频', link: '/api/ai/video-seedance' },
            { text: 'Kling 视频', link: '/api/ai/video-kling' },
            { text: 'Claude', link: '/api/ai/claude' },
            { text: 'Gemini', link: '/api/ai/gemini' }
          ]
        },
        {
          text: 'AI 路由：账户与模型',
          items: [
            { text: 'GET /v1/balance', link: '/api/ai/routes/v1-balance' },
            { text: 'GET /v1/user/balance', link: '/api/ai/routes/v1-user-balance' },
            { text: 'GET /v1/models', link: '/api/ai/routes/v1-models' }
          ]
        },
        {
          text: 'AI 路由：文本',
          items: [
            { text: 'POST /v1/chat/completions', link: '/api/ai/routes/v1-chat-completions' },
            { text: 'POST /v1/completions', link: '/api/ai/routes/v1-completions' },
            { text: 'POST /v1/responses', link: '/api/ai/routes/v1-responses' },
            { text: 'POST /v1/audio/speech', link: '/api/ai/routes/v1-audio-speech' },
            { text: 'POST /v1/audio/transcriptions', link: '/api/ai/routes/v1-audio-transcriptions' },
            { text: 'POST /v1/moderations', link: '/api/ai/routes/v1-moderations' }
          ]
        },
        {
          text: 'AI 路由：图片',
          items: [
            { text: 'POST /v1/uploads/images', link: '/api/ai/routes/v1-uploads-images' },
            { text: 'POST /v1/images/generations', link: '/api/ai/routes/v1-images-generations' },
            { text: 'GET /v1/images/generations/:id', link: '/api/ai/routes/v1-images-generations-get' },
            { text: 'POST /v1/images/edits', link: '/api/ai/routes/v1-images-edits' }
          ]
        },
        {
          text: 'AI 路由：视频任务',
          items: [
            { text: 'POST /v1/video/generations', link: '/api/ai/routes/v1-video-generations-post' },
            { text: 'GET /v1/video/generations/:id', link: '/api/ai/routes/v1-video-generations-get' },
            { text: 'POST /v1/video/tasks', link: '/api/ai/routes/v1-video-tasks-post' },
            { text: 'GET /v1/video/tasks/:id', link: '/api/ai/routes/v1-video-tasks-get' },
            { text: 'POST /v1/videos/tasks', link: '/api/ai/routes/v1-videos-tasks-post' },
            { text: 'GET /v1/videos/tasks/:id', link: '/api/ai/routes/v1-videos-tasks-get' },
            { text: 'POST /v1/videos/generations', link: '/api/ai/routes/v1-videos-generations' },
            { text: 'GET /v1/videos/generations/:id', link: '/api/ai/routes/v1-videos-generations-get' },
            { text: 'POST /v1/videos/:id/remix', link: '/api/ai/routes/v1-videos-id-remix' },
            { text: 'POST /v1/seedance2/private-avatar', link: '/api/ai/routes/v1-seedance2-private-avatar' },
            { text: 'GET /v1/tasks/:id', link: '/api/ai/routes/v1-tasks-id' }
          ]
        },
        {
          text: 'AI 路由：Midjourney',
          items: [
            { text: 'POST /v1/midjourney/generations', link: '/api/ai/routes/v1-midjourney-generations' },
            { text: 'POST /v1/midjourney/generations/imagine', link: '/api/ai/routes/v1-midjourney-generations-imagine' },
            { text: 'POST /v1/midjourney/generations/:action', link: '/api/ai/routes/v1-midjourney-generations-action' },
            { text: 'GET /v1/midjourney/:id', link: '/api/ai/routes/v1-midjourney-id' }
          ]
        },
        {
          text: 'AI 路由：Kling 兼容',
          items: [
            { text: 'POST /v1/videos/image2video', link: '/api/ai/routes/v1-videos-image2video-post' },
            { text: 'GET /v1/videos/image2video/:id', link: '/api/ai/routes/v1-videos-image2video-get' }
          ]
        },
        {
          text: 'AI 路由：Claude / Gemini',
          items: [
            { text: 'POST /v1/messages', link: '/api/ai/routes/v1-messages' },
            { text: 'POST /v1/models/:modelAction', link: '/api/ai/routes/v1-models-model-action' },
            { text: 'POST /v1beta/models/:modelAction', link: '/api/ai/routes/v1beta-models-model-action' }
          ]
        },
        {
          text: '控制台接口',
          items: [
            { text: '控制台总览', link: '/api/console/' },
            { text: '公共控制台接口', link: '/api/console/public' },
            { text: '认证控制台接口', link: '/api/console/auth' },
            { text: '用户控制台接口', link: '/api/console/user' },
            { text: '管理员控制台接口', link: '/api/console/admin' },
            { text: '高级版控制台接口', link: '/api/console/premium' },
            { text: '控制台逐路由', link: '/api/console/routes/' }
          ]
        },
        {
          text: '高级版接口',
          items: [
            { text: '高级版接口', link: '/api/premium' }
          ]
        }
      ],

      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '项目介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '核心概念', link: '/guide/concepts' }
          ]
        },
        {
          text: '使用 API',
          items: [
            { text: '管理 API 密钥', link: '/guide/api-keys' },
            { text: '调用网关', link: '/guide/calling-the-api' },
            { text: '兼容协议', link: '/guide/protocols' },
            { text: '模型与定价', link: '/guide/models-and-pricing' },
            { text: '工作室运营', link: '/guide/advanced-chat-studio' },
            { text: '助理聊天计划任务', link: '/guide/advanced-chat-tasks' },
            { text: '托管云沙箱', link: '/guide/advanced-chat-sandboxes' }
          ]
        },
        {
          text: '账户',
          items: [
            { text: '登录与认证方式', link: '/guide/authentication' },
            { text: '钱包与充值', link: '/guide/wallet' },
            { text: '签到与邀请', link: '/guide/checkin-and-referral' },
            { text: '用量与日志', link: '/guide/usage-logs' }
          ]
        }
      ],

      '/admin/': [
        {
          text: '部署与运维',
          items: [
            { text: '管理总览', link: '/admin/overview' },
            { text: '安装部署', link: '/admin/installation' },
            { text: '初始化设置', link: '/admin/initial-setup' },
            { text: '环境变量', link: '/admin/configuration' },
            { text: '运行模式', link: '/admin/runtime-modes' },
            { text: '运行维护', link: '/admin/operations' }
          ]
        },
        {
          text: '平台配置',
          items: [
            { text: '渠道管理', link: '/admin/channels' },
            { text: '模型管理', link: '/admin/models' },
            { text: '用户渠道与路由', link: '/admin/user-channels' },
            { text: '分组与倍率', link: '/admin/groups-and-multipliers' },
            { text: '计费体系', link: '/admin/billing' }
          ]
        },
        {
          text: '运营功能',
          items: [
            { text: '用户管理', link: '/admin/users' },
            { text: '支付与充值', link: '/admin/payment' },
            { text: '签到与邀请返佣', link: '/admin/checkin-referral' },
            { text: '公告与状态页', link: '/admin/announcements-status' },
            { text: '站点与界面设置', link: '/admin/site-settings' }
          ]
        },
        {
          text: '安全',
          items: [
            { text: '安全与防护', link: '/admin/security' }
          ]
        }
      ],

      '/develop/': [
        {
          text: '架构',
          items: [
            { text: '系统架构', link: '/develop/architecture' },
            { text: '代码结构', link: '/develop/project-structure' },
            { text: '请求处理流程', link: '/develop/request-flow' }
          ]
        },
        {
          text: '参考',
          items: [
            { text: 'API 参考', link: '/develop/api-reference' },
            { text: '数据模型', link: '/develop/data-models' },
            { text: 'Meta Model DSL', link: '/develop/meta-model-dsl' }
          ]
        },
        {
          text: '贡献',
          items: [
            { text: '本地开发', link: '/develop/local-development' },
            { text: '扩展点 Hooks', link: '/develop/extension-hooks' },
            { text: '构建与发布', link: '/develop/building' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WindyPear-Team/veloce' }
    ],

    footer: {
      message: '基于 MIT 协议发布（社区版）',
      copyright: 'Copyright © 2018 - 2026 WindyPear Team'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新于'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
