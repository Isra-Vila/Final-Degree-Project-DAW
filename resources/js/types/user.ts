// js/types/user.ts
export interface User {
    id: number;
    name: string;
    email: string;
    roles: { id: number; name: string }[];
    created_at: string;
    updated_at: string;
  }