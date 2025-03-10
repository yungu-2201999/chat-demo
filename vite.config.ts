import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ UnoCSS(),react(),],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:11434',
        changeOrigin: true,
      }
    }
  }
})
