<?php

namespace App\Http\Controllers\Admin\Organization;

use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\Directorate; // Import Model Directorate
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivController extends Controller
{
    function readDiv()
    {

        $divisi = Division::all();
        $directorates = Directorate::all(['id', 'name']);

        return Inertia::render('division', [
            'divisi' => $divisi,
            'directorates' => $directorates,
        ]);
    }
    function createDiv(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'directorat_id' => 'required|exists:directorates,id'
        ]);

        $createDiv = Division::create([
            'name' => $request->name,
            'directorat_id' => $request->directorat_id
        ]);
        return response()->json($createDiv);
    }
}
