import { defineConfig } from 'astro/config';

const isCloudDeploy = process.env.DEPLOY_TARGET === 'cloud';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project page（仓库名作为子路径）；云服务器根路径部署时 base 为 /
  site: isCloudDeploy ? undefined : 'https://yunyustudio.github.io',
  base: isCloudDeploy ? '/' : '/personal_resume_YunYu/',

  // 仓库根目录已存在 index.html 等旧文件，构建产物写入 dist/，由部署 workflow 上传 dist。
  outDir: 'dist',

  // i18n 采用客户端字典切换（zh / en），避免 GitHub Pages base 路径下的路由复制与 trailing slash 风险。
});
