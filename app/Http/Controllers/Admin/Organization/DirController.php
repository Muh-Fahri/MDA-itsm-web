<?php

namespace App\Http\Controllers\Admin\Organization;

use Inertia\Inertia;
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
}
