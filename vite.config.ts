import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

// import {
//   createStyleImportPlugin,
//   ElementPlusResolve,
// } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // createStyleImportPlugin({
    //   resolves: [ElementPlusResolve()],
    //   libs: [
    //     // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
    //     {
    //       libraryName: 'element-plus',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `element-plus/lib/theme-chalk/${name}.css`;
    //       },
    //       ensureStyleFile: true, // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
    //     },
    //   ],
    // }),
    // pnpm install -D commitizen cz-conventional-changelog @commitlint/config-conventional @commitlint/cli commitlint-config-cz cz-customizable
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
