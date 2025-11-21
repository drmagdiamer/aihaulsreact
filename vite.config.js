// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // This exposes the app on your local network and fixes the binding issue
        port: 5173, // Optional: ensures the port is always 5173
        strictPort: true // optional: fail instead of picking a random free port
    },
})
