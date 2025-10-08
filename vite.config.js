import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    allowedHosts: ['hooked-concretely-gerald.ngrok-free.dev'], // 👈 Add your ngrok domain here
    host: true, // 👈 Optional: allow external access (important for ngrok)
  },
})
