// js/types/user.ts
export interface Role {
  id: number;
  name: string;
  // Añade aquí cualquier otra propiedad que tenga un rol (por ejemplo, 'guard_name')
}

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[]; // Cambiado para usar la interfaz Role
  created_at: string;
  updated_at: string;
}