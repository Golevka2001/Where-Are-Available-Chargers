import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { viteMockServe } from 'vite-plugin-mock';
import { VitePWA } from 'vite-plugin-pwa';

import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      vuetify({
        autoImport: true,
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: env.VITE_USE_MOCK === 'true',
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
        workbox: {
          navigateFallbackDenylist: [/^\/api/, /^\/static/, /^\/classic/],
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
      proxy: {
        '/api': {
          target: 'http://localhost:8787',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
