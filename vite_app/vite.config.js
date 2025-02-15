import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server :{
    allowedHosts: [
      'cdb3-2409-40c1-5004-8229-566-939d-77-66f2.ngrok-free.app'
    ]
  }
})
