<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransportOrder extends Model
{
     protected $fillable = [
        'order_number',
        'driver_id',
        'origin_address',
        'destination_address',
        'cargo_description',
        'status',
        'scheduled_date',
        'weight_kg',
        'notes',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
        'weight_kg' => 'decimal:2',
    ];

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
