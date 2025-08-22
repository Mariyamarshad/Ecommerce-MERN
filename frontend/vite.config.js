import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
  // 👇 This is the key fix
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {},
  preview: {
    port: 5000,
  },
  // This ensures that refreshes on routes like /login work
  server: {
    historyApiFallback: true,
  },
})
