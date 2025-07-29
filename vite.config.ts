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
        target: 'http://lip.genesys.com:9080',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', () => {
          });
          proxy.on('proxyReq', () => {
          });
          proxy.on('proxyRes', () => {
          });
        },
      }
    }
  }
})


