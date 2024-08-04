import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@/': '/src/' // 设置 @ 别名指向 src 文件夹
    }
  },
  css: {
    // 添加全局样式文件
    preprocessorOptions: {
      less: {
        additionalData: `@import "${__dirname}/src/style/less/common.less";`
      }
    }
  }
})
