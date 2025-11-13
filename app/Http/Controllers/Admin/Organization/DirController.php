<?php

namespace App\Http\Controllers\Admin\Organization;

use Inertia\Inertia;
use App\Models\Division;
use App\Models\Departement;
use App\Models\Directorate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DirController extends Controller
{
    function readDirectorate()
    {
        $directorates = Directorate::all(); // ambil semua data

        return Inertia::render('dashboard', [
            'directorates' => $directorates, // kirim ke view
        ]);
    }

    function createDirectorate(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $directorate = Directorate::create([
            'name' => $request->name
        ]);

        return response()->json($directorate);
    }

    function deleteDirectorate($id)
    {
        $dir = Directorate::where('id', $id)->get();
        $dir->delete();

        return view('dashboard');
    }

    function dashboard()
    {
        $directorates = Directorate::all();
        $divisions = Division::all();
        $departemen = Departement::all();

        return Inertia::render('dashboard', [
            'directorates' => $directorates,
            'divisions' => $divisions,
            'departemen' => $departemen,
            'total_departements' => $departemen->count(),
            'total_projects' => 0, // sesuaikan
            'total_users' => 0,    // sesuaikan
        ]);
    }
}
