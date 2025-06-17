<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\GenreController;

class AdminGenreController extends GenreController
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:admin']);
    }
}