// resources/js/types/appointment.ts

// No necesitamos importar User si client y mechanic solo tienen id, name, email dentro de la cita.
// Si tu backend te envía un objeto User completo para client y mechanic dentro de la cita,
// entonces mantendrías la importación y ClientType/MechanicType como 'User'.
// Por el error, parece que solo vienen id, name, email.

// Definir ClientType y MechanicType con solo las propiedades que el backend envía con la cita.
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
    client?: ClientType | null;     // Puede ser ClientType o null o undefined
    mechanic?: MechanicType | null; // Puede ser MechanicType o null o undefined
    description?: string | null;
    created_at?: string;
    updated_at?: string;
  }