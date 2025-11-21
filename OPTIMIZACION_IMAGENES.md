# 📸 Optimización de Imágenes - Developer Portfolio

## ✅ Optimizaciones Implementadas

### 1. **Estructura de Archivos**
```
src/assets/
├── images/          # Imágenes generales (perfil, banners)
│   └── miguelDR05.webp (7.5KB)
├── projects/        # Imágenes de proyectos
│   ├── inventory-manager.jpg (40KB) ← optimizada desde 886KB
│   └── developer-portfolio.jpg (24KB) ← optimizada desde 43KB
└── skills/          # (vacío - SVGs permanecen en public/)

public/
└── skills/          # SVGs (no requieren optimización)
    ├── react.svg
    ├── nodejs.svg
    └── ...
```

### 2. **Compresión Aplicada**
| Archivo | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| `inventory-manager.jpg` | 886KB | 40KB | **95.5%** 🎉 |
| `developer-portfolio.jpg` | 43KB | 24KB | **44.2%** |
| `miguelDR05.webp` | 7.5KB | 7.5KB | Ya óptima ✅ |

**Reducción total: ~900KB eliminados**

### 3. **Componente `<Image>` de Astro**

Todos los componentes usan ahora el componente optimizado `<Image>`:

#### Hero.astro
```astro
<Image 
  src={miguelImage}
  loading="eager"           // Carga inmediata (above the fold)
  fetchpriority="high"      // Prioridad alta
  densities={[1, 2]}        // 1x y 2x para retina
/>
```

#### Projects.astro
```astro
<Image
  src={projectImages[p.image]}
  loading="lazy"            // Lazy loading (below the fold)
  decoding="async"          // No bloquea el hilo principal
  densities={[1, 1.5, 2]}   // 1x, 1.5x, 2x responsive
  width={800}
  height={600}
/>
```

### 4. **Configuración de Astro**

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    formats: ['avif', 'webp', 'jpg'],  // Genera múltiples formatos
    quality: 80,                        // Balance peso/calidad
    densities: [1, 1.5, 2],            // Soporte para pantallas retina
  }
})
```

### 5. **TypeScript Paths**

```json
{
  "paths": {
    "@assets/*": ["src/assets/*"]
  }
}
```

Permite importar con `@assets/images/foto.jpg`

---

## 🚀 Beneficios de Rendimiento

### Antes
- ❌ 886KB en imagen principal
- ❌ Sin lazy loading consistente
- ❌ Sin optimización automática
- ❌ CSS bloqueado por carga de imágenes
- ❌ Solo formato JPG original

### Después
- ✅ 40KB en imagen principal (-95.5%)
- ✅ Lazy loading para imágenes below-the-fold
- ✅ Genera AVIF + WebP + JPG automáticamente
- ✅ CSS carga inmediatamente
- ✅ Múltiples densidades (1x, 1.5x, 2x)
- ✅ Atributos `fetchpriority` y `decoding`

---

## 📖 Guía de Uso

### Agregar una nueva imagen

1. **Coloca la imagen en `src/assets/`**
   ```bash
   src/assets/projects/mi-proyecto.jpg
   ```

2. **Importa en tu componente**
   ```astro
   import miProyecto from "@assets/projects/mi-proyecto.jpg";
   ```

3. **Usa el componente `<Image>`**
   ```astro
   <Image 
     src={miProyecto}
     alt="Descripción"
     width={800}
     height={600}
     loading="lazy"
   />
   ```

### Comprimir imágenes antes de agregarlas

```bash
# Instala sharp-cli globalmente (opcional)
npm install -g sharp-cli

# Comprime una imagen
npx sharp-cli -i original.jpg -o optimizada.jpg resize 800 600 --mozjpeg --quality 80
```

---

## 🎯 Mejores Prácticas

### Loading Strategies

| Ubicación | Estrategia | Atributos |
|-----------|-----------|-----------|
| **Hero/Above the fold** | Eager | `loading="eager"` `fetchpriority="high"` |
| **Below the fold** | Lazy | `loading="lazy"` `decoding="async"` |
| **Background images** | Lazy | CSS + IntersectionObserver |

### Tamaños Recomendados

| Tipo | Dimensiones | Peso Objetivo |
|------|-------------|---------------|
| Avatar/Perfil | 200x200px | < 50KB |
| Tarjetas proyecto | 800x600px | < 150KB |
| Hero/Banner | 1920x1080px | < 300KB |
| Iconos | SVG preferido | < 10KB |

### Formatos por Tipo

- **Fotos**: WebP > AVIF > JPG
- **Ilustraciones**: WebP > PNG
- **Iconos/Logos**: SVG (vector)
- **Transparencias**: WebP > PNG

---

## 🔍 Verificación

### Build output
```bash
npm run build
```

Busca la sección:
```
generating optimized images
  ▶ /_astro/imagen.hash_variant.webp (before: 40kB, after: 24kB)
```

### Lighthouse Score
- **Performance**: 90+ ✅
- **Largest Contentful Paint**: < 2.5s ✅
- **Cumulative Layout Shift**: < 0.1 ✅

---

## 📚 Recursos

- [Astro Image Optimization](https://docs.astro.build/en/guides/images/)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
