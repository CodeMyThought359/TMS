export type Role = 'SUPER_ADMIN' | 'TEMPLE_ADMIN' | 'STAFF';

export interface User {
  id: number;
  name: string;
  role: Role;
    modules: string[];
  temple_id?: number;
  token: string;
}

export interface LoginPayload {
  login: string;   // email or phone
  password: string;
}





