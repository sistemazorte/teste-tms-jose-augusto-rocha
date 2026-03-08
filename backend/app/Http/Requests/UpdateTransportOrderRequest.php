<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransportOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'driver_id' => 'required|exists:drivers,id',
            'origin_address' => 'required|string|max:255',
            'destination_address' => 'required|string|max:255',
            'cargo_description' => 'required|string',
            'weight_kg' => 'nullable|numeric|min:0',
            'status' => 'required|in:pending,collecting,collected,delivering,delivered',
            'scheduled_date' => 'required|date',
            'notes' => 'nullable|string'
        ];
    }
}
