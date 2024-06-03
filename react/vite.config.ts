import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "common": path.resolve(__dirname, "../common")
    },
  },
  plugins: [react()],
});
