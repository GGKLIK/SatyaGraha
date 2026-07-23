import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Konfigurasi dasar Vite untuk proyek React + Tailwind
export default defineConfig({
  plugins: [react()],
  base: '/SatyaGraha/',
});
