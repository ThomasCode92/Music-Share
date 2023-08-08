import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Music Share',
        theme_color: '#ff5e3a',
        icons: [
          {
            src: 'assets/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg}'],
      },
    }),
    visualizer({ open: true }),
  ],
});
