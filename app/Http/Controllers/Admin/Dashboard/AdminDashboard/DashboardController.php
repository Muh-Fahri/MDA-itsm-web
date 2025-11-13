<?php

namespace App\Http\Controllers\Admin\Dashboard\AdminDashboard;

use Inertia\Inertia;
use App\Models\Division;
use App\Models\Departement;
use App\Models\Directorate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    function dashboard()
    {
        $directorates = Directorate::all();
        $divisions = Division::all();
        $departemen = Departement::all();

        return Inertia::render('dashboard', [
            'directorates' => $directorates,
            'divisions' => $divisions,
            'departemen' => $departemen,
        ]);
    }
    public function storeDirectorate(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $directorate = Directorate::create(['name' => $request->name]);
        return response()->json($directorate);
    }

    public function storeDepartemen(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'divisions_id' => 'required|exists:divisions,id'
        ]);

        $departemen = Departement::create([
            'name' => $request->name,
            'divisions_id' => $request->divisions_id
        ]);

        return response()->json($departemen);
    }
}
