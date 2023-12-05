import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({ 
  plugins: [react()],
  resolve: {     // định nghĩa import tuyệt đối
    alias: {
      '~': "/src",
    },
  },
})
