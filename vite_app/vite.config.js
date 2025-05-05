import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server :{
 host: '0.0.0.0', // Allow external access
    port: 7892,
    strictPort: true,
    allowedHosts: [
      'cdb3-2409-40c1-5004-8229-566-939d-77-66f2.ngrok-free.app',
      'tattooart.io', // Add your domain here
      'www.tattooart.io' // Include www subdomain if needed
    ],
preview: {
    port: 7892,
    host: '0.0.0.0'
  }
  }
})
