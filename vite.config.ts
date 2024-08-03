// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for API 1
      '/api': {
        target: 'https://www.validators.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Proxy for API 2
      '/apiV': {
        target: 'https://api-mainnet.magiceden.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiV/, ''),
      },
    },
  },
});
