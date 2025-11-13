<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('divisions', function (Blueprint $table) {
            $table->id(); // -> unsignedBigInteger('id') AUTO_INCREMENT PRIMARY
            $table->string('name');
            $table->unsignedBigInteger('directorat_id');
            $table->timestamps();

            $table->foreign('directorat_id')->references('id')->on('directorates')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('divisions');
    }
};
