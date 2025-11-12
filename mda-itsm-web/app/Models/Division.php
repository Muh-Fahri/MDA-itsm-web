<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Division extends Model
{
    protected $fillable = [
        'name',
        'directorat_id'
    ];

    public function directorat(): BelongsTo
    {
        return $this->belongsTo(Directorate::class, 'directorat_id');
    }
}
