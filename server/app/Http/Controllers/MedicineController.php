<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    // GET: fetch all medicines
    public function index()
    {
        return response()->json(Medicine::all());
    }

    // POST: store new medicine
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'generic_name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'category' => 'required|string|max:255',
        ]);

        $medicine = Medicine::create($validated);

        return response()->json([
            'message' => 'Medicine added successfully',
            'data' => $medicine
        ], 201);
    }
}

