<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // Store a new order
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'pharmacy_id' => 'required',                     
            'delivery_type' => 'required|in:home_delivery,pickup',
            'items' => 'required|array'                     
        ]);

        // Set delivery charge
        $deliveryCharge = 0;
        if ($request->delivery_type == 'home_delivery') {
            $deliveryCharge = 50; 
        }

        //  Calculate total price
        $totalPrice = 0;
        foreach ($request->items as $item) {
            $medicine = DB::select(
                "SELECT * FROM medicines WHERE id = ?",
                [$item['medicine_id']]
            );

            if (!$medicine) {
                return response()->json(['message' => 'Medicine not found'], 404);
            }

            $price = $medicine[0]->price;
            $totalPrice += $price * $item['quantity'];
        }

        // Add delivery charge to total
        $totalPrice += $deliveryCharge;

        // Pick a rider for this order
        $rider = DB::select("SELECT * FROM riders ORDER BY RAND() LIMIT 1");
        $riderId = $rider ? $rider[0]->id : null; 

        // Insert the order into 'orders' table
        DB::insert(
            "INSERT INTO orders (user_id, pharmacy_id, delivery_type, delivery_charge, total_price, rider_id)
             VALUES (?, ?, ?, ?, ?, ?)",
            [
                Auth::id(),                
                $request->pharmacy_id,
                $request->delivery_type,
                $deliveryCharge,
                $totalPrice,
                $riderId
            ]
        );

        // Get last inserted order ID
        $orderId = DB::getPdo()->lastInsertId();

        // Insert each ordered medicine into 'order_items' table
       foreach ($request->items as $item) {

    // Check available stock to prevent negative stock
    $availableStock = DB::table('medicines')->where('id', $item['medicine_id'])->value('stock');
    if ($item['quantity'] > $availableStock) {
        return response()->json([
            'success' => false,
            'message' => "Not enough stock for medicine id " . $item['medicine_id']
        ], 400);
    }

    //  Get medicine price
    $medicine = DB::select("SELECT * FROM medicines WHERE id = ?", [$item['medicine_id']]);
    $price = $medicine[0]->price;

    // Insert into order_items
    DB::insert(
        "INSERT INTO order_items (order_id, medicine_id, quantity, price)
         VALUES (?, ?, ?, ?)",
        [
            $orderId,
            $item['medicine_id'],
            $item['quantity'],
            $price
        ]
    );

    // Reduce stock
    DB::statement(
        "UPDATE medicines SET stock = stock - ? WHERE id = ?",
        [$item['quantity'], $item['medicine_id']]
    );
}

        // Return success response
        return response()->json([
            'message' => 'Order placed successfully',
            'order_id' => $orderId,
            'rider_assigned' => $riderId
        ]);
    }
}