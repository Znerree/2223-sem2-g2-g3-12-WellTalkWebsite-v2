import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";
import dns from "dns";

export default defineConfig({
  plugins: [react(), qrcode()],
  build: {
    outDir: "../src/main/resources/static",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
  base: "/",
  server: {
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  assetsInclude: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.gif", "**/*.json"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
