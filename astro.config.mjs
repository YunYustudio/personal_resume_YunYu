import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project page（仓库名作为子路径）
  site: 'https://yunyustudio.github.io',
  base: '/personal_resume_YunYu/',

  // 仓库根目录已存在 index.html 等旧文件，构建产物写入 dist/，由部署 workflow 上传 dist。
  outDir: 'dist',

  // i18n 采用客户端字典切换（zh / en），避免 GitHub Pages base 路径下的路由复制与 trailing slash 风险。
});
