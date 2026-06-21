import { defineConfig } from 'vitepress'

// WindyPear Token Market 文档站点配置
export default defineConfig({
  lang: 'zh-CN',
  title: 'WindyPear Token Market',
  description: 'AI Token 市场与 API 网关 · 用户文档与开发文档',
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
      { text: '管理员手册', link: '/admin/overview' },
      { text: '开发文档', link: '/develop/architecture' },
      {
        text: '参考',
        items: [
          { text: 'API 参考', link: '/develop/api-reference' },
          { text: 'Meta Model DSL', link: '/develop/meta-model-dsl' },
          { text: '版本分层', link: '/develop/editions' }
        ]
      },
      {
        text: '相关链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/WindyPear-Team/windypear-api-backend' },
          { text: '专业版', link: 'https://project.flweb.cn/tokenmarket' }
        ]
      }
    ],

    sidebar: {
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
            { text: '模型与定价', link: '/guide/models-and-pricing' }
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
            { text: '环境变量', link: '/admin/configuration' }
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
            { text: '版本分层模型', link: '/develop/editions' },
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
      { icon: 'github', link: 'https://github.com/WindyPear-Team/windypear-api-backend' }
    ],

    footer: {
      message: '基于 MIT 协议发布（社区版）',
      copyright: 'Copyright © 2025 WindyPear Team'
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
