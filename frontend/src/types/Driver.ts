export interface Driver {
  id: number | null;
  name: string;
  cpf: string;
  cnh_number: string;
  cnh_category: string;
  phone: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
