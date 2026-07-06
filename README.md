# Veloce 文档站点

基于 [VitePress](https://vitepress.dev/) 的项目文档，包含用户文档、管理员手册与开发文档。

## 本地预览

```bash
cd docs/site
npm install
npm run dev      # http://localhost:5173
```

## 构建

```bash
npm run build    # 输出到 .vitepress/dist
npm run preview  # 预览构建产物
```

## 目录

```
site/
├── .vitepress/config.mts   站点配置（导航、侧边栏、主题）
├── index.md                首页
├── guide/                  用户文档
├── admin/                  管理员手册
├── develop/                开发文档
└── public/                 静态资源
```
