<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    protected $fillable = [
        'name',
        'divisions_id'
    ];

    function division()
    {
        return $this->belongsTo(Division::class, 'divisions_id');
    }
}
