<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    // Add an item to the cart
    public function addToCart(Request $request)
    {
        $user_id = auth()->id(); // get logged-in user
        $medicine_id = $request->medicine_id;
        $quantity = $request->quantity;

        // Check if this medicine is already in the user's cart
        $existing = DB::select(
            "SELECT id, quantity FROM carts WHERE user_id = ? AND medicine_id = ?",
            [$user_id, $medicine_id]
        );

        if ($existing) {
            // If it exists, increase the quantity
            DB::update(
                "UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND medicine_id = ?",
                [$quantity, $user_id, $medicine_id]
            );
        } else {
            // Otherwise, insert a new row
            DB::insert(
                "INSERT INTO carts (user_id, medicine_id, quantity) VALUES (?, ?, ?)",
                [$user_id, $medicine_id, $quantity]
            );
        }

        return response()->json(['message' => 'Item added to cart successfully']);
    }

    // Update the quantity of a cart item
    public function updateCart(Request $request)
    {
        $cart_id = $request->cart_id;
        $quantity = $request->quantity;
        $user_id = auth()->id(); // make sure user can only update their own cart

        DB::update(
            "UPDATE carts SET quantity = ? WHERE id = ? AND user_id = ?",
            [$quantity, $cart_id, $user_id]
        );

        return response()->json(['message' => 'Cart quantity updated']);
    }

    // Remove an item from the cart
    public function removeFromCart($id)
    {
        $user_id = auth()->id(); // only allow user to remove their own items

        DB::delete(
            "DELETE FROM carts WHERE id = ? AND user_id = ?",
            [$id, $user_id]
        );

        return response()->json(['message' => 'Item removed from cart']);
    }

    // Get all items in the logged-in user's cart
    public function getMyCart()
    {
        $user_id = auth()->id();

        $cartItems = DB::select(
            "SELECT 
                c.id as cart_id,
                c.quantity,
                m.id as medicine_id,
                m.name,
                m.price,
                m.company
             FROM carts c
             JOIN medicines m ON c.medicine_id = m.id
             WHERE c.user_id = ?",
            [$user_id]
        );

        return response()->json($cartItems);
    }
}
