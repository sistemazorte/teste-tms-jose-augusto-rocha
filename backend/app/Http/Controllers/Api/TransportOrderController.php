<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransportOrderRequest;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateTransportOrderRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\TransportOrderResource;
use App\Models\TransportOrder;
use Illuminate\Http\Request;

class TransportOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
       return TransportOrderResource::collection(
        TransportOrder::with('driver')->orderBy('id', 'desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransportOrderRequest $request)
    {
        $data = $request->validated();
        $year = date('Y');

        $lastOrder = TransportOrder::whereYear('created_at', $year)
            ->orderByDesc('id')
            ->first();

        $nextNumber = $lastOrder
            ? (int) substr($lastOrder->order_number, -4) + 1
            : 1;

        $data['order_number'] = 'OT-' . $year . '-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

        $transportOrder = TransportOrder::create($data);
        return response(new TransportOrderResource($transportOrder), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TransportOrder $transportOrder)
    {
        return new TransportOrderResource($transportOrder);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransportOrderRequest $request, TransportOrder $transportOrder)
    {
        $data = $request->validated();

        $transportOrder->update($data);

        return new TransportOrderResource($transportOrder);
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransportOrder $transportOrder)
    {
        $transportOrder->delete();

        return response("", 204);
    }

public function updateStatus(Request $request, TransportOrder $transportOrder)
{
    $request->validate([
        'status' => 'required|in:pending,collecting,collected,delivering,delivered',
    ]);

    $transportOrder->status = $request->input('status');
    $transportOrder->save();

    return response(new TransportOrderResource($transportOrder), 200);
}
}
