<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDriverRequest extends FormRequest
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
        $driverId = $this->route('driver')->id;

        return [
            'name' => 'required|string|max:150',
            'cpf' => 'required|string|size:14|unique:drivers,cpf,' . $driverId,
            'cnh_number' => 'required|string|max:20|unique:drivers,cnh_number,' . $driverId,
            'cnh_category' => 'required|string|in:A,B,C,D,E',
            'phone' => 'nullable|string|max:20',
            'is_active' => 'sometimes|boolean',
        ];
    }
}
