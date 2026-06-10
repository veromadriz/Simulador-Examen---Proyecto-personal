import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': 'http://127.0.0.1:5000',
      '/login': 'http://127.0.0.1:5000',
      '/register': 'http://127.0.0.1:5000',
      '/guardar_resultado': 'http://127.0.0.1:5000',
      '/estadisticas': 'http://127.0.0.1:5000',
      '/ultimo_resultado': 'http://127.0.0.1:5000',
      '/connie': 'http://127.0.0.1:5000'
    }
  }
});