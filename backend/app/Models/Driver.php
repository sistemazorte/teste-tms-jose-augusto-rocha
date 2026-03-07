<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $fillable = [
        'name',
        'cpf',
        'cnh_number',
        'cnh_category',
        'phone',
        'is_active',
    ];
}
