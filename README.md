# 向东的技术站

一个使用 Astro、Tailwind CSS 和 Markdown 构建的纯静态个人技术网站，包含项目展示、技术博客、标签筛选、深色模式、RSS、SEO 和 GitHub Pages 自动部署。

## 1. 本地运行

先安装 [Node.js](https://nodejs.org/) 22.12 或更高版本，然后在项目目录执行：

```bash
npm install
npm run dev
```

浏览器打开终端显示的地址，通常是 `http://localhost:4321`。

常用命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器，修改内容后自动刷新 |
| `npm run check` | 检查 Astro 与 TypeScript 问题 |
| `npm run build` | 检查并生成正式网站到 `dist/` |
| `npm run preview` | 在本地预览已经构建的正式网站 |

## 2. 发布前先修改个人信息

打开 `src/config.ts`：

- `github` 已填写为 `https://github.com/kaka12331`；
- 将 `douyin` 替换为抖音账号的完整主页链接；
- 将 `csdn` 替换为 CSDN 博客的完整主页链接；
- 可以修改站点名称、描述和首页一句话介绍。

当前头像是 `public/avatar-placeholder.svg`。准备好真实头像后，可以：

1. 把图片放进 `public/`，例如 `public/avatar.jpg`；
2. 在 `src/pages/index.astro` 和 `src/pages/about.astro` 中将 `/avatar-placeholder.svg` 改为 `/avatar.jpg`。

关于页目前写入了 2025、2026 年省一等奖信息。发布前请核对奖项全称和年份，必要时修改 `src/pages/about.astro` 中的 `timeline`。

## 3. 如何新增一篇博客

在 `src/content/blog/` 新建 Markdown 文件，例如：

```text
src/content/blog/stm32-uart-dma.md
```

文件开头填写 frontmatter，下面写正常 Markdown：

````md
---
title: "STM32 串口 DMA 接收笔记"
description: "记录空闲中断配合 DMA 接收不定长数据的实现。"
pubDate: 2026-08-17
updatedDate: 2026-08-18
tags: ["STM32", "DMA", "串口"]
cover: "/blog/uart-cover.jpg"
draft: false
---

## 问题背景

这里开始写正文。

```c
void HAL_UARTEx_RxEventCallback(UART_HandleTypeDef *huart, uint16_t Size)
{
    // 示例代码
}
```
````

注意：

- 文件名会成为网址的一部分，例如上面的文章地址是 `/blog/stm32-uart-dma/`；
- `draft: true` 时文章不会出现在列表、首页和 RSS 中；
- 日期建议使用 `YYYY-MM-DD`；
- 图片放在 `public/` 下，frontmatter 和正文里都从 `/` 开始写路径；
- 标题会自动生成锚点，详情页会自动显示目录。

## 4. 如何新增一个项目

在 `src/content/projects/` 新建 Markdown 文件，例如：

```md
---
title: "STM32F103RCT6 双层教学开发板"
description: "一句话说明项目解决什么问题。"
tags: ["STM32", "PCB设计", "教学板"]
githubUrl: "https://github.com/kaka12331/请替换为真实仓库名"
cover: "/projects/board-cover.jpg"
demoUrl: "https://请替换为真实演示链接"
status: "已完成"
featured: true
---

## 项目背景

写项目的完整介绍、原理和使用方法。
```

- `featured: true` 的项目会出现在首页；
- `githubUrl` 必须是完整链接；
- 没有演示地址时直接删除 `demoUrl`；
- 没有封面时可以删除 `cover`，页面会显示默认占位样式。

字段规则统一定义在 `src/content.config.ts`。如果新增字段，也需要在这里补充校验规则。

## 5. GitHub Pages 部署

项目已经包含 `.github/workflows/deploy.yml`，推送到 `main` 分支后会自动构建。

第一次部署：

1. 在 GitHub 创建一个新仓库，例如 `tech-site`；
2. 将本项目提交并推送到该仓库的 `main` 分支；
3. 打开仓库 **Settings → Pages**；
4. 在 **Build and deployment → Source** 中选择 **GitHub Actions**；
5. 打开仓库的 **Actions** 页面，等待 `Deploy to GitHub Pages` 完成；
6. 部署地址通常是 `https://kaka12331.github.io/仓库名/`。

`astro.config.mjs` 会在 GitHub Actions 中自动读取仓库名，并设置正确的 `site` 和 `base`。如果仓库名是 `kaka12331.github.io`，网站会部署在域名根目录。

## 6. 改用独立域名、Vercel 或 Netlify

### 独立域名

部署构建时设置：

```text
SITE_URL=https://你的域名
BASE_PATH=/
```

然后按照托管平台说明配置域名 DNS。GitHub Pages 还需要在 `public/` 添加名为 `CNAME` 的文件，内容只写你的域名。

### Vercel / Netlify

导入 GitHub 仓库，通常会自动识别 Astro。若需要手动填写：

- 构建命令：`npm run build`
- 输出目录：`dist`
- Node.js：22.12 或更高版本
- 环境变量：`SITE_URL` 填正式域名，`BASE_PATH` 填 `/`

不需要修改页面和内容结构，也不需要数据库。

## 7. 目录说明

```text
src/
├─ components/       页面复用组件：导航、卡片、筛选等
├─ content/
│  ├─ blog/          博客 Markdown
│  └─ projects/      项目 Markdown
├─ layouts/          全局 HTML、SEO、页头页脚
├─ lib/              路径和日期工具
├─ pages/            网站路由页面
├─ styles/           全局样式
├─ config.ts         个人信息与社交链接
└─ content.config.ts 内容字段规则
public/              图片、图标等无需编译的静态资源
```

## 8. 首页一句话备选

当前版本：

> 电子信息工程在读，专注嵌入式与竞赛硬件开发，把电赛踩过的坑和开源项目都记录在这里。

还可以换成：

1. 在电路、代码与控制之间做工程，也把每一次调试变成公开的经验。
2. 电子信息工程在读，用嵌入式和硬件解决问题，用开源把过程留下来。
3. 从原理图到能跑的系统：记录电赛实践、嵌入式开发与开源硬件。

## 9. 后续扩展

项目结构已经为这些功能保留空间：

- 使用 Pagefind 增加静态全文搜索；
- 构建时调用 GitHub API，显示仓库 star 和最近更新时间；
- 使用 Giscus 增加基于 GitHub Discussions 的评论。

建议先完善真实文章、项目图片和账号链接，再逐项增加功能。
