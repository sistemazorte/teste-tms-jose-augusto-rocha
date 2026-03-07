<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       DB::table('drivers')->insert([
            [
                'name' => "John",
                'cpf' => randomCpf(),
                'cnh_number' => randomNumberString(11),
                'cnh_category' => randomCnhCategory(),
                'phone' => randomPhoneNumber(),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jane Smith',
                'cpf' => randomCpf(),
                'cnh_number' => randomNumberString(11),
                'cnh_category' => randomCnhCategory(),
                'phone' => randomPhoneNumber(),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Carlos Silva',
                'cpf' => randomCpf(),
                'cnh_number' => randomNumberString(11),
                'cnh_category' => randomCnhCategory(),
                'phone' => randomPhoneNumber(),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maria Oliveira',
                'cpf' => randomCpf(),
                'cnh_number' => randomNumberString(11),
                'cnh_category' => randomCnhCategory(),
                'phone' => randomPhoneNumber(),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pedro Santos',
                'cpf' => randomCpf(),
                'cnh_number' => randomNumberString(11),
                'cnh_category' => randomCnhCategory(),
                'phone' => randomPhoneNumber(),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
