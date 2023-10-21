/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
// import ViteFonts from 'unplugin-fonts/vite';
import { viteMockServe } from 'vite-plugin-mock';

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import { VitePWA } from 'vite-plugin-pwa';
// Generate PWA/Service Worker files

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
    }),
    /*ViteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),*/
    // 似乎没有必要引入字体，先注释掉了
    viteMockServe({
      mockPath: 'mock',
      enable: process.env.NODE_ENV === 'development',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Where Are Available Chargers?!',
        short_name: 'Chargers',
        description: 'Find Chargers Easily in Southeast University',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
  },
  // Vitest
  test: {},
});
