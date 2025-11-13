<?php

use App\Http\Controllers\Admin\Organization\DepartementController;
use App\Http\Controllers\Admin\Organization\DirController;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard diarahkan ke controller
    Route::get('/dashboard', [DirController::class, 'readDirectorate'])->name('dashboard');
    Route::post('/dashboard', [DirController::class, 'createDirectorate'])->name('directorateCreate');
    Route::delete('/dashboard/delete/{id}', [DirController::class, 'deleteDirectorate'])->name('directorateDelete');
    Route::get('/dashboard', [DirController::class, 'dashboard'])->name('dashboard');


    Route::post('/departemen', [DepartementController::class, 'departementCreate'])->name('departementCreate');
    Route::get('/departemen', [DepartementController::class, 'departementRead'])->name('departement');
});

require __DIR__ . '/settings.php';
