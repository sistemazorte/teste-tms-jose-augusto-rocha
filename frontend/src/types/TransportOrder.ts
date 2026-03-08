export interface TransportOrder {
  id: number | null;
  order_number: string;
  driver_id: number;
  driver_name: string;
  origin_address: string;
  destination_address: string;
  cargo_description: string;
  weight_kg?: number | null;
  status: "pending" | "collecting" | "collected" | "delivering" | "delivered";
  scheduled_date: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}
