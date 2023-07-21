import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UnoCSS()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './docs'),
    },
  },
})
