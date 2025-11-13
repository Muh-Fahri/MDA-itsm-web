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

        $directorates = Directorate::all();

        return Inertia::render('directorate', [
            'directorates' => $directorates
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
}
