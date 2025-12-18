import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; 
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '', // 👈 REQUIRED for GitHub Pages

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

   plugins: [
  react(),
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'RepMax1 – 1 Rep Max Calculator',
      short_name: 'RepMax1',
      description: 'Free 1 Rep Max (1RM) calculator for strength training.',
      theme_color: '#D0FB0D',
      background_color: '#000000',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.PNG',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
],


    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
