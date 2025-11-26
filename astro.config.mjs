// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// import netlify from '@astrojs/netlify';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    // @ts-ignore - Incompatibilidad de tipos entre Vite y @tailwindcss/vite
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});