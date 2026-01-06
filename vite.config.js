import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 关键：把 '你的仓库名' 替换成你在 GitHub 上的仓库名称
  // 例如你的仓库是 github.com/jack/my-website，这里就写 '/my-website/'
  base: '/debao/', 
})