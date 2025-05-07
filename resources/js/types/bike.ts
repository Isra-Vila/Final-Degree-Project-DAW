// js/types/bike.ts
import { User } from './user'; // Si quieres referenciar la interfaz User aquí

interface Appointment {
  id: number;
  type: 'reparacion' | 'mantenimiento';
  start_time: string;
  end_time: string;
  mechanic?: User | null;
  status: 'pendiente' | 'en progreso' | 'completada' | 'cancelada';
  // Añade aquí cualquier otra propiedad que tengan tus citas
}

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
  appointments?: Appointment[]; // Añade la propiedad appointments aquí
}