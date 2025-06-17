<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\MovieController;

class AdminMovieController extends MovieController
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:admin']);
    }
}