import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/lib': path.resolve(__dirname, "lib"),
      '@/components': path.resolve(__dirname, "components"),
      '@/hooks': path.resolve(__dirname, "./src/hooks")
    }
  },
});
