import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  base: "/",
  plugins: [react(), qrcode()],
  build: {
    outDir: "../src/main/resources/static",
    rollupOptions: {
      input: "/index.html",
    },
  },
  server: {
    origin: "http://localhost:8080",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
