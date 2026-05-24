import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({

  // IMPORTANTE PARA GITHUB PAGES
  base: '/LibroClases-frontend/',

  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],

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