<?php

use App\Http\Controllers\Admin\Dashboard\AdminDashboard\DashboardController;
use App\Http\Controllers\Admin\Organization\DepartementController;
use App\Http\Controllers\Admin\Organization\DirController;
use App\Http\Controllers\Admin\Organization\DirecorateController;
use App\Http\Controllers\Admin\Organization\DivController;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::post('/directorate', [DashboardController::class, 'storeDirectorate']);
    Route::post('/departemen', [DashboardController::class, 'storeDepartemen']);


    Route::post('/departemen', [DepartementController::class, 'departementCreate'])->name('departementCreate');
    Route::get('/departemen', [DepartementController::class, 'departementRead'])->name('departement');

    Route::get('/directorate', [DirController::class, 'readDirectorate'])->name('directRead');
    Route::post('/directorate', [DirController::class, 'createDirectorate'])->name('createDir');

    Route::get('/division', [DivController::class, 'readDiv'])->name('divisi');
    Route::post('/division', [DivController::class, 'createDiv'])->name('divCreate');
});

require __DIR__ . '/settings.php';
