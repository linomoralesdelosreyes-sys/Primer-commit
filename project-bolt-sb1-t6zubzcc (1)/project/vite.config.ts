import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  base: '/', // IMPORTANTE: usa '/' no './' para Vercel
  publicDir: 'public',
  server: {
    host: true
  }
})