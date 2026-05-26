import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({  
  plugins: [react()],
  base: '/sam-port',
  assetsInclude: ['**/*.glb'],
  server: {
    host: true,    // ← allows access from other devices
    port: 5173,
  }
})