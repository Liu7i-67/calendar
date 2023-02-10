import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      components: resolve(__dirname, "src/components"),
      hooks: resolve(__dirname, "src/hooks"),
      utils: resolve(__dirname, "src/utils"),
    },
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
