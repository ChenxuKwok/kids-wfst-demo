import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/K-function/',
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(new URL('.', import.meta.url).pathname, 'src'),
    },
  },
})
