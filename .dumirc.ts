import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.ts',
  },
  scripts: ['https://unpkg.com/dayjs@1.8.21/dayjs.min.js'],
  themeConfig: {
    name: 'l-idea',
  },
});
