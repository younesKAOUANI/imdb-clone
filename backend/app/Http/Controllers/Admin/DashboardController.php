<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Actor;
use App\Models\Genre;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:admin']);
    }

    public function index()
    {
        $stats = [
            'movies_count' => Movie::count(),
            'actors_count' => Actor::count(),
            'genres_count' => Genre::count(),
        ];

        return response()->json(['stats' => $stats], 200);
    }
}