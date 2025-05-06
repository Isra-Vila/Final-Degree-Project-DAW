// js/types/bike.ts
import { User } from './user'; // Si quieres referenciar la interfaz User aquí

export interface Bike {
  id: number;
  brand: string;
  model: string;
  handlebar?: string | null;
  stem?: string | null;
  saddle?: string | null;
  frame?: string | null;
  suspension?: string | null;
  pedals?: string | null;
  chain?: string | null;
  tyre?: string | null;
  rim?: string | null;
  tube?: string | null;
  brakes?: string | null;
  year?: number | null;
  owner_id?: number | null;
  mechanic_id?: number | null;
  owner?: User; // Asumiendo que tendrás esta relación y la interfaz User
  mechanic?: User; // Asumiendo que tendrás esta relación y la interfaz User
  repair_state?: string | null;
  maintenance_state?: string | null;
  created_at?: string;
  updated_at?: string;
}