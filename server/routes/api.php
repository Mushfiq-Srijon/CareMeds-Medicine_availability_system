<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\CartController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/medicines', [MedicineController::class, 'index']);


// Protected Routes (Require Login Token)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/my-orders', [OrderController::class, 'myOrders']);

    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::put('/cart/update', [CartController::class, 'updateCart']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']);
    Route::get('/cart', [CartController::class, 'getMyCart']);

});