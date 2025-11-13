<?php

namespace App\Http\Controllers\Admin\Organization;

use Inertia\Inertia;
use App\Models\Division;
use App\Models\Departement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DepartementController extends Controller
{
    function departementCreate(Request $request)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'divisions_id' => 'required|exists:divisions,id',
        ]);
        $departemen = Departement::create([
            'name' => $request->name,
            'divisions_id' => $request->divisions_id,
        ]);
        return response()->json($departemen);
    }
    function departementRead()
    {
        $depart = Departement::all();
        $divisions = Division::select('id', 'name')->get(); // ⬅️ Ambil data divisi

        return Inertia::render('departement', [
            'departemen' => $depart,
            'divisions' => $divisions,
        ]);
    }
}
