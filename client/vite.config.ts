import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./pages"),
      "@components": path.resolve(__dirname, "./components"),
      "@assets": path.resolve(__dirname, "./assetss"),
    },
  },
});
