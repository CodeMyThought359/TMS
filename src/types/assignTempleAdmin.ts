export interface AssignTempleAdminForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  temple_id: number;
  options?: Array<{ value: number; label: string }>;
}