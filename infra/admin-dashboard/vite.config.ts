import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: '.',
  plugins: [react()],
  // NOTE (2026-08-11, take 2): Traefik now routes admin.easylegal.my.id with
  // PathPrefix(`/dashboard`) + a stripPrefix middleware (see
  // websiteel-app/docker-compose.dokploy.yml). That means the BROWSER always
  // requests asset paths starting with /dashboard/ (Traefik only strips the
  // prefix for the backend-forwarded request, not what the browser sees) —
  // so built asset references need that prefix again, or requests never
  // match the Traefik router at all. Was briefly changed to '/' under the
  // assumption Traefik routed the whole domain root here with no prefix;
  // that's no longer true.
  base: '/dashboard/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      },
      '/images': {
        target: 'http://localhost:4000',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
