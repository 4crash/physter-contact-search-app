import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        headers: {
            'Cache-Control': 'no-store',
        },
        middlewareMode: false,
    },
})
