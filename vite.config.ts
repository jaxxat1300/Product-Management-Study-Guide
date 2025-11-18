import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages: set VITE_BASE_PATH to your repository name (e.g., '/repo-name/')
// If deploying to root domain, use '/' or leave VITE_BASE_PATH empty
const basePath = process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/Product-Management-Study-Guide/' : '/')

export default defineConfig({
  plugins: [react()],
  base: basePath,
})
