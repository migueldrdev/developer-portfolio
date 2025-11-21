export interface Menu {
  id: string;
  href?: string;
  label: string;
  items?: Menu[];
  current?: boolean;// Recursividad en los datos
  divider?: boolean; // <--- La clave para el "Sign out"
}