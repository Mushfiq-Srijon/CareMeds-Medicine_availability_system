<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Medicine;

class MedicineSeeder extends Seeder
{
    public function run()
    {
        $medicines = [
            ['name' => 'Paracetamol', 'generic_name' => 'Acetaminophen', 'company' => 'Beximco', 'category' => 'Painkiller'],
            ['name' => 'Amoxicillin', 'generic_name' => 'Amoxicillin Trihydrate', 'company' => 'Renata', 'category' => 'Antibiotic'],
            ['name' => 'Cetirizine', 'generic_name' => 'Cetirizine Hydrochloride', 'company' => 'Eskayef', 'category' => 'Antihistamine'],
            ['name' => 'Omeprazole', 'generic_name' => 'Omeprazole', 'company' => 'ACI', 'category' => 'Antacid'],
            ['name' => 'Metformin', 'generic_name' => 'Metformin Hydrochloride', 'company' => 'Square', 'category' => 'Antidiabetic'],
            ['name' => 'Ibuprofen', 'generic_name' => 'Ibuprofen', 'company' => 'Beximco', 'category' => 'Painkiller'],
            ['name' => 'Amlodipine', 'generic_name' => 'Amlodipine Besylate', 'company' => 'Renata', 'category' => 'Antihypertensive'],
            ['name' => 'Azithromycin', 'generic_name' => 'Azithromycin', 'company' => 'Eskayef', 'category' => 'Antibiotic'],
            ['name' => 'Vitamin C', 'generic_name' => 'Ascorbic Acid', 'company' => 'ACI', 'category' => 'Supplement'],
        ];

        foreach ($medicines as $medicine) {
            Medicine::create($medicine);
        }
    }
}
