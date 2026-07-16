import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },

    test: {
        environment: 'jsdom', // Simulates browser environment
        globals: true, // Allows using describe, test, expect without explicit imports
        setupFiles: './src/test/setup.js', // Global setup file path (use .ts if using TypeScript)
    },
})
