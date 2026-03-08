<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransportOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'driver_id' => $this->driver_id,
            'driver_name' => $this->driver?->name,
            'origin_address' => $this->origin_address,
            'destination_address' => $this->destination_address,
            'cargo_description' => $this->cargo_description,
            'weight_kg' => $this->weight_kg,
            'status' => $this->status,
            'scheduled_date' => $this->scheduled_date->format('Y-m-d H:i:s'),
            'notes' => $this->notes,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
