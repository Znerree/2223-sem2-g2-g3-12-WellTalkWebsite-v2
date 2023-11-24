import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  plugins: [react(), qrcode()],
  base: "/webapp/",
  build: {
    outDir: "../src/main/resources/webapp",
    emptyOutDir: true,
  },
  server: {
    origin: "*",
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
