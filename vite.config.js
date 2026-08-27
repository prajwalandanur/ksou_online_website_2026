import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  /*
   * Deployed to IIS at https://onlineprogramme.ksoumysuru.ac.in/ksou_test/,
   * beside the university's existing site at the domain root, so every
   * bundled asset URL needs that prefix.
   *
   * This is the ONLY place the subpath is written down. `src/constants/basePath.js`
   * reads it back as `import.meta.env.BASE_URL` and derives the router
   * basename and the `public/` asset helper from it, so moving the site to
   * the domain root (or another folder) is a one-line change here rather
   * than a find-and-replace across the codebase.
   *
   * Must keep the trailing slash — Vite joins it to asset paths directly.
   */
  base: '/ksou_test/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
