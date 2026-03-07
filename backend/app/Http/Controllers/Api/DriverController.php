<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Http\Requests\StoreDriverRequest;
use App\Http\Requests\UpdateDriverRequest;
use App\Http\Resources\DriverResource;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DriverResource::collection(
            Driver::query()->orderBy('id', 'desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDriverRequest $request)
    {
        $data = $request->validated();

        $driver = Driver::create($data);
        return response(new DriverResource($driver), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        return new DriverResource($driver);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDriverRequest $request, Driver $driver)
    {
        $data = $request->validated();
        $driver->update($data);

        return new DriverResource($driver);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function toggleActive(Driver $driver)
    {
        $driver->is_active = !$driver->is_active;
        $driver->save();

        return response(new DriverResource($driver), 200);
    }
}
