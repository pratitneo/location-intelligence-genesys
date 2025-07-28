import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@partials': '/src/styles/partials',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@partials/variables' as *;
@use '@partials/utilities' as *;`
      }
    }
  },
  server: {
    proxy: {
      '/API': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})


