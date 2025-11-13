<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Directorate extends Model
{
    protected $fillable = [
        'name',
    ];

    function divisi()
    {
        return $this->hasMany(Division::class, 'directorate_id');
    }
}
