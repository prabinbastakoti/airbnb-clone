import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
    // proxy: {
    //   '/api': {
    //     target: 'https://airbnb-api-9urn.onrender.com:10000',
    //     changeOrigin: true,
    //   },
    // },
  },
});
