import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Clarity/',   // 👈 set your repo name here with slashes
  plugins: [react()],
})
