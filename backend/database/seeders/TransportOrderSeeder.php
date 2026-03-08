<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class TransportOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       DB::table('transport_orders')->insert([
            [
                'order_number' => 'OT-2024-0001',
                'driver_id' => 1,
                'origin_address' => 'Av. Paulista, 1000, São Paulo - SP',
                'destination_address' => 'Rua das Flores, 200, Rio de Janeiro - RJ',
                'cargo_description' => 'Eletrônicos - 50 caixas',
                'weight_kg' => 500,
                'status' => 'pending',
                'scheduled_date' => now()->addDays(1),
                'notes' => 'Entregar com cuidado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0002',
                'driver_id' => 2,
                'origin_address' => 'Rua Afonso Pena, 300, Belo Horizonte - MG',
                'destination_address' => 'Av. Brasil, 1500, Curitiba - PR',
                'cargo_description' => 'Móveis desmontados',
                'weight_kg' => 1200,
                'status' => 'collecting',
                'scheduled_date' => now()->addDays(2),
                'notes' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0003',
                'driver_id' => 3,
                'origin_address' => 'Av. Getúlio Vargas, 800, Porto Alegre - RS',
                'destination_address' => 'Rua das Acácias, 50, Florianópolis - SC',
                'cargo_description' => 'Alimentos não perecíveis',
                'weight_kg' => 700,
                'status' => 'delivering',
                'scheduled_date' => now()->addDays(3),
                'notes' => 'Checar validade dos produtos',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0004',
                'driver_id' => 4,
                'origin_address' => 'Rua XV de Novembro, 500, Curitiba - PR',
                'destination_address' => 'Av. Rio Branco, 1200, Salvador - BA',
                'cargo_description' => 'Livros e papelaria',
                'weight_kg' => 300,
                'status' => 'collected',
                'scheduled_date' => now()->addDays(1),
                'notes' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0005',
                'driver_id' => 5,
                'origin_address' => 'Av. Amazonas, 2500, Manaus - AM',
                'destination_address' => 'Rua Boa Vista, 900, Belém - PA',
                'cargo_description' => 'Roupas - 200 caixas',
                'weight_kg' => 1000,
                'status' => 'delivered',
                'scheduled_date' => now()->addDays(4),
                'notes' => 'Entregar até o final do dia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0006',
                'driver_id' => 1,
                'origin_address' => 'Av. Brasil, 100, Recife - PE',
                'destination_address' => 'Rua Santos Dumont, 450, Fortaleza - CE',
                'cargo_description' => 'Produtos de higiene',
                'weight_kg' => 350,
                'status' => 'pending',
                'scheduled_date' => now()->addDays(2),
                'notes' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0007',
                'driver_id' => 2,
                'origin_address' => 'Rua da Independência, 77, Porto Alegre - RS',
                'destination_address' => 'Av. Beira Mar, 200, Florianópolis - SC',
                'cargo_description' => 'Ferramentas e utensílios',
                'weight_kg' => 600,
                'status' => 'collecting',
                'scheduled_date' => now()->addDays(3),
                'notes' => 'Cuidado com objetos frágeis',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0008',
                'driver_id' => 3,
                'origin_address' => 'Av. Ipiranga, 1000, Porto Alegre - RS',
                'destination_address' => 'Rua XV de Novembro, 500, Curitiba - PR',
                'cargo_description' => 'Alimentos frescos',
                'weight_kg' => 450,
                'status' => 'collected',
                'scheduled_date' => now()->addDays(1),
                'notes' => 'Entregar rápido',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0009',
                'driver_id' => 4,
                'origin_address' => 'Rua das Palmeiras, 250, Salvador - BA',
                'destination_address' => 'Av. Paulista, 1500, São Paulo - SP',
                'cargo_description' => 'Eletrônicos - 20 caixas',
                'weight_kg' => 550,
                'status' => 'delivering',
                'scheduled_date' => now()->addDays(2),
                'notes' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_number' => 'OT-2024-0010',
                'driver_id' => 5,
                'origin_address' => 'Av. JK, 800, Brasília - DF',
                'destination_address' => 'Rua das Flores, 200, Rio de Janeiro - RJ',
                'cargo_description' => 'Móveis montados',
                'weight_kg' => 1300,
                'status' => 'pending',
                'scheduled_date' => now()->addDays(5),
                'notes' => 'Entregar no horário combinado',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
