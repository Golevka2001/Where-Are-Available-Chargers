/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { viteMockServe } from 'vite-plugin-mock';
import { VitePWA } from 'vite-plugin-pwa';

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
    }),
    viteMockServe({
      mockPath: 'mock',
      enable: process.env.NODE_ENV === 'development',
    }),
    VitePWA({
      // Generate PWA/Service Worker files
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
      workbox: {
        navigateFallbackDenylist: [
          /^\/api/,
          /^\/doc/,
          /^\/ver4/,
          /^\/ver3/,
          /^\/static/,
          /^\/classical/,
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
