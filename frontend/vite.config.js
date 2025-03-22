import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
});
=======
export default defineConfig({
  plugins: [react()],
})
>>>>>>> e4cb2bd299e09d2d8c6eeafee862615f032d40e6
