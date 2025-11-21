// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  image: {
    // Configuración de optimización de imágenes para Astro 5
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
    // Dominios remotos permitidos (si usas imágenes externas)
    remotePatterns: [],
  },
  vite: {
    // @ts-ignore - Incompatibilidad de tipos entre Vite y @tailwindcss/vite
    plugins: [tailwindcss()]
  }
});