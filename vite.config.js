import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
base: '/student-developer-dashboard/',
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
