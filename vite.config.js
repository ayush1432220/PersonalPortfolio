import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // In production /api/contact is a Vercel serverless function on the same
    // origin. Locally, proxy it to the Express dev server (npm run server) so the
    // frontend can use the same relative URL in both environments.
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
