// resources/js/types/appointment.ts
interface ClientType {
    id: number;
    name: string;
    email: string;
  }
  
  interface MechanicType {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Appointment {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'failed' | 'canceled';
    type: 'reparacion' | 'mantenimiento';
    bike_id: number;
    client?: ClientType | null;     
    mechanic?: MechanicType | null; 
    description?: string | null;
    created_at?: string;
    updated_at?: string;
  }