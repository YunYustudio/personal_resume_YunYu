# 个人简历作品集 · Astro 重构方案

> 目标：把现有「网站三剑客」纯静态三文件，重构为 **Astro + Tailwind + 内容集合** 的现代化静态站点，保留现有视觉语言（暗色科技风 + 樱花粒子），支持 GitHub Pages 自动部署，并让「加项目 / 加简历」变成「加一个文件」的事。

---

## 一、现状盘点（已核实）

| 项 | 现状 |
|----|------|
| 页面区块 | Hero / Stats / Proof / Projects(5 个) / Gallery(筛选+灯箱) / Timeline / Contact / Footer |
| 项目案例 | 5 个：点餐系统(p1)、看雪论坛(p2)、蕴宇 ERP(p3)、商业 ERP 证据(p4)、生鲜商城(p5) |
| 画廊图片 | 65 张 WebP，分 5 类：`ordering`(15) `forum`(7) `yunyu-erp`(8) `work-evidence`(5) `fresh-mall`(30) |
| i18n | 手写字典，约 130 键中英双语，靠 `data-i18n` / `data-i18n-attr` 属性驱动，localStorage 存偏好 |
| 动画 | Canvas 粒子网络 + Canvas 樱花飘落 + CSS 扫描线/光带 + IntersectionObserver 滚动入场 |
| 部署 | `.github/workflows/static.yml` 直接 `upload-pages-artifact@v3` 传整个仓库（path: '.'） |
| 环境 | Node v22.22.2 / npm 10.9.7，仓库已启用 git |

**重构核心诉求**：美观不变、作品完整展示、后续可扩展（加简历）、GitHub Pages 静态部署。

---

## 二、技术栈

| 层 | 选型 | 说明 |
|----|------|------|
| 框架 | **Astro 5**（最新稳定） | 静态优先，构建纯 HTML，GitHub Pages 零运行时 |
| 样式 | **Tailwind CSS 4**（via `@tailwindcss/vite`） | 原子化，做美观响应式最快，主题色一处统管 |
| 内容 | **Astro Content Collections** | 项目案例 / 画廊 / 简历「数据化」，加内容 = 加文件 |
| 国际化 | **@astrojs/i18n** | URL 级双语 `/` 与 `/en/`，SEO 友好 |
| 动画 | 原生 Canvas 脚本（沿用现有逻辑） | 粒子 / 樱花原样迁移，保留 `prefers-reduced-motion` |
| 语言 | TypeScript | 类型安全 |
| 部署 | **@astrojs/github** 集成 | 自动生成 Actions，push 即部署 |
| 包管理 | npm（环境已具备） | — |

> 交互岛屿：画廊筛选、灯箱这类纯前端交互，用 Astro `<script>` 客户端脚本实现，不引入 React/Vue，保持零框架运行时、首屏最快。

---

## 三、目录结构

```
personal_resume_YunYu/
├── .github/
│   └── workflows/
│       └── deploy.yml            # 改造：build → 上传 dist（替代现 static.yml）
├── public/
│   └── assets/images/            # 65 张 WebP 原样拷贝（public 下资源不处理，直接输出）
│       ├── ordering/  forum/  yunyu-erp/  work-evidence/  fresh-mall/
├── src/
│   ├── content/
│   │   ├── config.ts             # 内容集合 schema（zod 校验）
│   │   ├── projects/             # 5 个项目案例，每个一个 .md
│   │   │   ├── ordering.md
│   │   │   ├── forum.md
│   │   │   ├── yunyu-erp.md
│   │   │   ├── work-evidence.md
│   │   │   └── fresh-mall.md
│   │   ├── gallery/              # 65 张画廊图条目（或 gallery.yaml 批量）
│   │   │   └── *.md
│   │   └── resume/               # 预留：个人简历（未来加 index.md 即可）
│   │       └── index.md
│   ├── i18n/
│   │   ├── ui.ts                 # UI 文案字典（约 130 键，替代 data-i18n）
│   │   └── utils.ts              # t() 取词 + 当前语言判断
│   ├── components/
│   │   ├── BaseLayout.astro      # <html>/<head>/背景 canvas/全局脚本
│   │   ├── SiteHeader.astro
│   │   ├── Hero.astro
│   │   ├── Stats.astro
│   │   ├── Proof.astro
│   │   ├── ProjectCase.astro     # 接收 projects 集合条目渲染
│   │   ├── Gallery.astro         # 渲染 + 筛选栏 + 灯箱
│   │   ├── Timeline.astro
│   │   ├── Contact.astro
│   │   ├── SiteFooter.astro
│   │   └── Background.astro      # 粒子+樱花 canvas 容器
│   ├── scripts/                  # 客户端脚本（Astro 打包）
│   │   ├── particles.ts          # 沿用现有 initParticles 逻辑
│   │   ├── sakura.ts             # 沿用现有 initSakura 逻辑
│   │   ├── reveal.ts             # IntersectionObserver 入场
│   │   ├── gallery.ts            # 筛选 + 灯箱交互
│   │   └── lang-switch.ts        # 语言切换（跳转到 /en 或 /）
│   ├── styles/
│   │   └── global.css            # @import "tailwindcss" + 保留的 keyframes(scan/sweep/holo)
│   └── pages/
│       ├── index.astro           # 中文首页
│       └── en/index.astro        # 英文首页（或经 i18n 中间件统一）
├── astro.config.mjs              # site/base + integrations
├── package.json
├── tsconfig.json
└── README.md
```

---

## 四、内容集合设计（核心可扩展性）

### 4.1 projects 集合（每个项目一个 .md）

`src/content/config.ts` 中定义 schema：

```ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    kicker: z.object({ zh: z.string(), en: z.string() }),
    title: z.object({ zh: z.string(), en: z.string() }),
    desc: z.object({ zh: z.string(), en: z.string() }),
    bullets: z.array(z.object({ zh: z.string(), en: z.string() })),
    tags: z.array(z.string()),
    links: z.array(z.object({ label: z.object({ zh: z.string(), en: z.string() }), href: z.string() })),
    images: z.array(z.string()),        // 指向 /assets/images/... 的相对路径
    order: z.number(),
  }),
});

export const collections = { projects };
```

**加新项目** = 在 `src/content/projects/` 新建一个 `.md`，其余页面自动渲染，零改代码。

### 4.2 gallery 集合（65 张图）

```ts
const gallery = defineCollection({
  type: 'data',                         // 纯数据，无需正文
  schema: z.object({
    category: z.enum(['ordering','forum','yunyu-erp','work-evidence','fresh-mall']),
    project: z.object({ zh: z.string(), en: z.string() }),
    title: z.object({ zh: z.string(), en: z.string() }),
    src: z.string(),
    shape: z.enum(['phone','desktop']).optional(),
  }),
});
```

可用 65 个 `.md`（data 集合）或单个 `gallery.yaml` 批量声明（推荐 yaml，减少文件数）。Gallery 组件按 `category` 渲染筛选按钮与网格。

### 4.3 resume 集合（预留）

定义空 schema，未来放 `src/content/resume/index.md` 即自动出现「简历」页/区块，不影响现有作品集。

---

## 五、i18n 设计

- **路由级**：`@astrojs/i18n`，默认 `/` 中文，`/en/` 英文。语言切换按钮跳转到对应路由。
- **UI 文案**：`src/i18n/ui.ts` 放现有约 130 个键（导航、按钮、区块标题等静态文案），组件内 `t('hero.title')` 取词。
- **内容双语**：项目案例、画廊标题等动态内容用集合里的 `{zh, en}` 字段，按当前语言取对应值。
- **偏好记忆**：首次访问按浏览器语言，切换后用 localStorage 记住（可选增强）。

---

## 六、动画迁移方案

| 现有 | 迁移方式 |
|------|---------|
| `initParticles()` | 原样搬入 `src/scripts/particles.ts`，在 `Background.astro` 以 `<script>` 引入，保留 reduce-motion 判断 |
| `initSakura()` | 原样搬入 `src/scripts/sakura.ts` |
| `.reveal` 入场 | 抽出 `src/scripts/reveal.ts`（IntersectionObserver，threshold 0.14） |
| `.scan-grid` / `.light-sweep` / `.holo-ring` / `.background-photo` | 转为 Tailwind 类 + `global.css` 中保留的 `@keyframes` |
| 灯箱 Modal | 改写为 `Gallery.astro` 内联 + `gallery.ts` 控制开关（保留 Esc 关闭、焦点管理） |

视觉风格（暗色 #0f172a 底 + 青/粉点缀 + 樱花）**完全保留**，只是实现从手写 CSS 变量升级为 Tailwind 设计令牌。

---

## 七、GitHub Pages 部署（改造现有 workflow）

现有 `static.yml` 上传整个仓库；重构后需**先 build 再上传 `dist/`**。两种做法：

**做法 A（推荐）：用 `@astrojs/github` 集成**
`astro.config.mjs` 加 `integrations: [github()]`, 它会自动生成 `.github/workflows/astro.yml` 并正确 build + 上传 dist。此时可删除旧 `static.yml`。

**做法 B：手动修改 `static.yml`**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: "pages"
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: "./dist" }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

> ⚠️ **base 路径决策点**：若仓库是 `username.github.io`（user page），`base: '/'`；若是 `username.github.io/personal_resume_YunYu`（project page），`astro.config.mjs` 需设 `base: '/personal_resume_YunYu/'`。请确认当前仓库类型。

---

## 八、实施步骤（增量、可验证）

1. **初始化** — `npm create astro@latest`（empty 模板）+ 加 Tailwind / i18n / github 集成；本地 `npm run dev` 能起。
2. **搬资产** — 把 `assets/images/` 整体复制到 `public/assets/images/`（原图不改，保持你"只加不删"的约定）。
3. **内容集合** — 写 `config.ts`；把 5 个项目案例转成 `projects/*.md`；65 张画廊写成 `gallery.yaml`。
4. **布局与组件** — 搭 `BaseLayout` + 各 section 组件，用 Tailwind 还原现有视觉。
5. **i18n** — 迁 130 键文案到 `ui.ts`，页面按语言渲染。
6. **动画脚本** — 迁 particles / sakura / reveal / gallery 交互。
7. **部署** — 改造 workflow（做法 A 或 B），本地 `npm run build` 验证 `dist/` 产出，push 触发 Pages。
8. **验收** — 对比原站：区块齐全、中英切换、画廊筛选+灯箱、动画、移动端响应式、GitHub Pages 可访问。

---

## 九、风险与待确认

| 项 | 说明 |
|----|------|
| 仓库类型 | user page 还是 project page？决定 `base` 配置（见第七节） |
| 生鲜商城资料目录 | `生鲜商城资料/*.md`、`.html` 是否一并纳入 Astro（可作独立页或保留静态）；建议先保留为静态资源 |
| 现有 i18n 键 | 约 130 键需逐条迁移到 `ui.ts`，工作量但无技术风险 |
| 构建体积 | 65 张 WebP 原样输出，需注意单图大小；可后续加 `<Image>` 优化（非必须） |

---

## 十、一句话总结

**Astro 管结构（内容集合驱动扩展），Tailwind 管颜值（保留暗色樱花科技风），@astrojs/github 管部署（push 即上线）**——把"加项目/加简历"从改三处代码降级为"加一个文件"。
