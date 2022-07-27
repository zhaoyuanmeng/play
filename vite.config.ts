import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    base: './',
    proxy: {
      '^/api': {
        // target: 'http://video.zpkang.top:8080/', //老蒋的地址
        // target: "http://127.0.0.1:4523/mock/930299/", //api/fox地址
        target: 'http://192.168.100.27:4000/api', //api/fox地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
