<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\TransportOrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/drivers', DriverController::class);
    Route::patch('/drivers/{driver}/toggle-active', [DriverController::class, 'toggleActive']);

    Route::apiResource('/transport-orders', TransportOrderController::class);
    Route::patch('/transport-orders/{transportOrder}/update-status', [TransportOrderController::class, 'updateStatus']);
});


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
