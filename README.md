# 蕴宇在线作品集 · Astro 版

基于 **Astro 5** 重构的静态作品集与个人简历站点，部署到 GitHub Pages 项目页（`https://yunyustudio.github.io/personal_resume_YunYu/`）。

## 技术栈
- **Astro 5**（`output: 'static'`，纯静态产物，可直接托管到任意静态服务 / GitHub Pages / Gitee Pages）
- **纯 CSS 设计系统**：玻璃拟态、扫描线、光扫、樱花飘落、科技粒子、滚动入场，忠实移植原 vanilla 方案的视觉风格
- **客户端国际化**：中英文一键切换，语言偏好存入 `localStorage`
- 零 UI 框架、零运行时依赖，仅 Astro 构建期依赖

## 目录结构
```
src/
  layouts/Base.astro        页面骨架（背景层 + 全局脚本打包）
  components/               Hero / Stats / Capabilities / Projects / Gallery / Timeline / Contact / Resume
  data/                     projects / gallery / site / resume（结构化双语数据）
  i18n/ui.ts                中英文文案表
  scripts/                  background.ts（画布动画） / i18n-client.ts（语言切换） / gallery.ts（筛选+灯箱）
  styles/global.css         设计系统（CSS 变量 + 全部视觉动效）
  pages/                    index.astro（首页） / resume.astro（简历页）
public/
  assets/                   背景图 + 5 类作品截图（WebP）
  生鲜商城资料/             生鲜商城项目文档（含文档索引 HTML）
astro.config.mjs            base: '/personal_resume_YunYu/'
.github/workflows/deploy.yml  GitHub Actions 部署
```

## 本地开发
```bash
npm install
npm run dev        # 本地预览，默认 http://localhost:4321/personal_resume_YunYu/
npm run build      # 产物输出到 dist/
npm run preview    # 预览构建产物
```
> 本仓库是 **GitHub Pages 项目页**，所有资源路径都带 `/personal_resume_YunYu/` 前缀，由 `astro.config.mjs` 的 `base` 统一管理，代码内通过 `withBase()` 拼接；本地 `dev` / `preview` 同样走该前缀。

## 部署
- 通过 `.github/workflows/deploy.yml`（GitHub Actions）自动构建并发布 **dist/** 到 GitHub Pages。
- **关键**：仓库 `Settings → Pages → Source` 必须选择 **GitHub Actions**（而不是某个 branch），否则新站点不会上线。
- 旧的 `static.yml` 已停用（`on: []`），保留以防回滚到旧方案。

## 内容维护
- 作品集项目：`src/data/projects.ts`
- 画廊图片：WebP 放入 `public/assets/images/<分类>/`，并在 `src/data/gallery.ts` 登记（分类见 `galleryFilters`）
- 个人简历：`src/data/resume.ts`
- 界面文案：`src/i18n/ui.ts`
- 视觉样式：`src/styles/global.css`

## 说明
- 原始项目截图未做修改，网站仅使用生成的 WebP 副本。
- 旧 vanilla 方案（`index.html` / `script.js` / `styles.css`）已移除，本仓库现以 Astro 为唯一真源。
