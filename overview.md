# 个人简历作品集 · Astro 重构 — 完成概览

## 做了什么
把原来的「网站三剑客」（纯 `index.html` / `styles.css` / `script.js`）整体重构为 **Astro 5** 静态站点，并已在本地提交（`adc574c`），工作树干净。

## 关键变更
- **技术栈**：Astro 5（`output: static`）+ 纯 CSS 设计系统，未引入 Tailwind / UI 框架，零运行时依赖。
- **视觉**：将原有玻璃拟态 / 扫描线 / 光扫 / 樱花飘落 / 科技粒子 / 滚动入场全部移植到 `src/styles/global.css`，忠实还原风格；并加 `prefers-reduced-motion` 降级。
- **国际化**：客户端中英文一键切换（字典 `src/i18n/ui.ts` + `data-*` 属性 + `localStorage`），SSR 直接渲染中文文本，无 JS 也可读。
- **内容**：5 个项目案例（点餐 / 看雪校园论坛 / 蕴宇 ERP / 商业 ERP 证据 / 生鲜商城）+ 65 张画廊图（分类筛选 + 灯箱预览），数据集中在 `src/data/`。
- **新增简历页**：`/resume` 独立个人简历页（基本信息 / 技能 / 工作经历 / 教育 / 精选项目），双语。
- **部署**：改为 GitHub Actions（`.github/workflows/deploy.yml` 构建并发布 `dist/`）；旧 `static.yml` 已 `on: []` 停用。
- **清理**：移除根目录旧 `index.html` / `script.js` / `styles.css` 与旧 README，改写 README 为 Astro 说明。
- **路径**：统一 `base: '/personal_resume_YunYu/'`，代码内用 `withBase()` 拼接。

## 验证（已做）
- `npm run build` 干净通过，2 页（`/`、`/resume/`），0 警告。
- 渲染核对：5 个项目标题、65 张画廊卡片（分类计数正确）、简历全文均作为可见 HTML 输出；CSS 设计系统与 JS（i18n / 画廊 / 灯箱 / 粒子）均正确打包并带 base 路径。
- 本地预览：`/` 与 `/resume/` 均返回 200。

## 待你确认 / 操作
1. **推送触发部署**：在你自己的终端执行 `git push -u origin main`（沙箱无法代推，需浏览器 OAuth 登录 YunYustudio 账号）。
2. **关键设置**：仓库 `Settings → Pages → Source` 必须选 **GitHub Actions**，否则新站点不会上线。
3. **可选清理**：根目录 `生鲜商城资料/` 与 `public/生鲜商城资料/` 目前重复（旧跟踪副本 + 新 public 副本），内容已在 public/，确认无误后可删根目录那份。

## 预览
本地预览已启动：首页与简历页均 200。
