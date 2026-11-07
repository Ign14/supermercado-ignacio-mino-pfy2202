import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base relativa: el build funciona tanto en gh-pages como en local.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  test: { environment: 'node' },
})
