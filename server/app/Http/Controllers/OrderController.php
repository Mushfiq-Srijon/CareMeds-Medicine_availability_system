<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
public function store(Request $request)
{
    $request->validate([
        'pharmacy_id'   => 'required',
        'delivery_type' => 'required|in:home_delivery,pickup',
        'items'         => 'required|array'
    ]);

    return DB::transaction(function () use ($request) {

        // Delivery charge
        $deliveryCharge = $request->delivery_type == 'home_delivery' ? 50 : 0;

        // Validate stock AND calculate total BEFORE inserting anything
        $totalPrice = 0;
        foreach ($request->items as $item) {
            $medicine = DB::select("SELECT * FROM medicines WHERE id = ?", [$item['medicine_id']]);

            if (!$medicine) {
                throw new \Exception("Medicine not found: " . $item['medicine_id']);
            }

            $availableStock = $medicine[0]->stock;
            if ($item['quantity'] > $availableStock) {
                throw new \Exception("Not enough stock for medicine id " . $item['medicine_id']);
            }

            $totalPrice += $medicine[0]->price * $item['quantity'];
        }

        $totalPrice += $deliveryCharge;

        // Assign random rider
        $rider   = DB::select("SELECT * FROM riders ORDER BY RAND() LIMIT 1");
        $riderId = $rider ? $rider[0]->id : null;

        // Insert order
        DB::insert(
            "INSERT INTO orders (user_id, pharmacy_id, delivery_type, delivery_charge, total_price, rider_id)
             VALUES (?, ?, ?, ?, ?, ?)",
            [Auth::id(), $request->pharmacy_id, $request->delivery_type, $deliveryCharge, $totalPrice, $riderId]
        );

        $orderId = DB::getPdo()->lastInsertId();

        // Insert order items & deduct stock
        foreach ($request->items as $item) {
            $medicine = DB::select("SELECT * FROM medicines WHERE id = ?", [$item['medicine_id']]);
            $price    = $medicine[0]->price;

            DB::insert(
                "INSERT INTO order_items (order_id, medicine_id, quantity, price) VALUES (?, ?, ?, ?)",
                [$orderId, $item['medicine_id'], $item['quantity'], $price]
            );

            DB::statement(
                "UPDATE medicines SET stock = stock - ? WHERE id = ?",
                [$item['quantity'], $item['medicine_id']]
            );
        }

        return response()->json([
            'message'        => 'Order placed successfully',
            'order_id'       => $orderId,
            'rider_assigned' => $riderId
        ]);
    });
}
}