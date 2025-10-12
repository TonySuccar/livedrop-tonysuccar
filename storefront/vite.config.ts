import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    css: true,            // lets RTL render components that import CSS
    coverage: {           // optional coverage
      reporter: ["text", "html"],
      provider: "v8",
    },
  },
} as any);
