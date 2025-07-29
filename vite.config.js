import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import environment from "vite-plugin-environment";

export default defineConfig({
  plugins: [react(), environment(["VITE_API_URL"]), svgr()],
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ["react-speech-recognition"],
  },
  resolve: {
    alias: {
      "@": "/src", // لاستخدام @ كمختصر لمسار src/
    },
  },
});
