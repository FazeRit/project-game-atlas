/// <reference types='vitest' />
import path from "path"
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],

  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/frontend',
  server: {
    port: 3001,
    host: 'localhost',
  },
  preview: {
    port: 3001,
    host: 'localhost',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});