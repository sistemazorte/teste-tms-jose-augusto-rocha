export interface NewTransportOrderData {
  driver_id: number;
  origin_address: string;
  destination_address: string;
  cargo_description: string;
  weight_kg?: number;
  scheduled_date: string;
  notes?: string;
  status: "pending";
}
