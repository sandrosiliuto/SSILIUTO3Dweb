import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config tuned for a 3D-heavy site: pre-bundle three/R3F deps
// and split chunks so initial load remains fast.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          gsap: ['gsap']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing', 'gsap']
  }
})
