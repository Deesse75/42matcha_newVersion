import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();
const PORTNUM_BACK = process.env.VITE_PORT_BACK || '';
const HOST_BACK = process.env.VITE_HOST_BACK || '';
const PORTNUM_FRONT = process.env.VITE_PORT_FRONT || '';
const HOST_FRONT = process.env.VITE_HOST_FRONT || '';
if (!PORTNUM_FRONT || !HOST_FRONT || !PORTNUM_BACK || !HOST_BACK) {
  console.error('Erreur: Veuillez configurer le fichier .env');
  process.exit(1);
}
const PORT = parseInt(PORTNUM_FRONT as string);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: HOST_FRONT,
    port: PORT,
  },
  build: {
    sourcemap: false, // Désactive les sources maps en production
  },

  css: {
    devSourcemap: false, // désactive les sources maps en mode développement
  },
});
