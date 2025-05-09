// resources/js/types/bike.ts
import { User } from './user';
import { Appointment } from './appointment'; // ⭐ Importa la interfaz Appointment unificada

export interface Bike {
  id: number;
  brand: string;
  model: string;
  type: string;
  description: string;
  license_plate: string;

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
  owner?: User;
  mechanic?: User;
  repair_state?: string | null;
  maintenance_state?: string | null;
  created_at?: string;
  updated_at?: string;
  appointments?: Appointment[]; // ⭐ Usa la interfaz Appointment unificada
}