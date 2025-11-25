export interface Project {
  type: 'client' | 'personal';
  // Campos comunes
  description: string;
  tags: string[];
  highlight?: boolean;
  
  // Campos para Proyectos Personales
  title?: string;
  image?: string; // Clave para mapear la imagen
  codeLink?: string;
  demoLink?: string;

  // Campos para Clientes
  clientName?: string;
  productName?: string;
  logo?: string; // Ruta en public
  abstractIcon?: string; // SVG string
  category?: string;
  role?: string;
}