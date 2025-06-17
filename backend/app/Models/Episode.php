<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id', 'season', 'episode_number', 'title', 'description', 'runtime',
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
} 