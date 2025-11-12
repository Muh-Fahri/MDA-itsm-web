<?php

namespace App\Http\Controllers\Admin\Organization;

use App\Http\Controllers\Controller;
use App\Models\Departement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartementController extends Controller
{
    function departemenentCreate(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $departemen = Departement::create([
            'name' => $request->name
        ]);

        return response()->json($departemen);
    }

    function departementRead()
    {
        $depart = Departement::all();

        return Inertia::render('dashboard', [
            'departemen' => $depart
        ]);
    }
}
