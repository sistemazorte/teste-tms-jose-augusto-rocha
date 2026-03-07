<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('transport_orders')->truncate();
        DB::table('drivers')->truncate();
        DB::table('users')->truncate();

        User::factory(4)->create();
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' =>bcrypt('admin'),
        ]);
        
        $this->call([
        DriverSeeder::class,
         ]);
    }
}
