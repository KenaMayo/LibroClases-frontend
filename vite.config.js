import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],

  // IMPORTANTE PARA GITHUB PAGES
  base: '/libroclases-frontend/',

  server: {
    proxy: {
      '/api': {
        target: 'https://nonposthumous-katabolically-constance.ngrok-free.dev',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})