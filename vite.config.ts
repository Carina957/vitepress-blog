import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [UnoCSS()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './docs'),
    },
  },
})
