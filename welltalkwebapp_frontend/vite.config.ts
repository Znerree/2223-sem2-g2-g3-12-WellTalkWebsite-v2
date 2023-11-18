import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  plugins: [react(), qrcode()],
  build: {
    outDir: "../welltalk_backend/src/main/resources/static",
    manifest: true,
    rollupOptions: {
      input: "index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
