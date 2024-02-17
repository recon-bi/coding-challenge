/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig({
  cacheDir: './node_modules/.vite/client-cache',

  server: {
    port: 3000,
    host: 'localhost',
  },

  preview: {
    port: 9000,
    host: 'localhost',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '.',
    }),
  ],

  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      common: path.resolve(__dirname, './src/common'),
      components: path.resolve(__dirname, './src/components'),
      config: path.resolve(__dirname, './src/config'),
      constants: path.resolve(__dirname, './src/constants'),
      context: path.resolve(__dirname, './src/context'),
      demos: path.resolve(__dirname, './src/demos'),
      hooks: path.resolve(__dirname, './src/hooks'),
      layouts: path.resolve(__dirname, './src/layouts'),
      lib: path.resolve(__dirname, './src/lib'),
      mocks: path.resolve(__dirname, './src/mocks'),
      model: path.resolve(__dirname, './src/model'),
      NotUsed: path.resolve(__dirname, './src/NotUsed'),
      types: path.resolve(__dirname, './src/types'),
      ui: path.resolve(__dirname, './src/ui'),
      routes: path.resolve(__dirname, './src/routes'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    css: true,
  },
});
