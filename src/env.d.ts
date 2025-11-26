/// <reference types="astro/client" />

// Extendemos los tipos de Astro para incluir el runtime de Cloudflare
declare namespace App {
  interface Locals {
    runtime?: {
      env: {
        GEMINI_API_KEY?: string;
        [key: string]: any;
      };
      cf?: any;
      ctx?: any;
    };
  }
}

// Variables de entorno del proyecto
interface ImportMetaEnv {
  readonly GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
