<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Realisateur extends Model
{
    protected $fillable = ['fistName', 'lastName', 'birthDate'];

    public function films()
    {
        return $this->hasMany(Film::class);
    }
}