<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::with('movies')->paginate(12);
        return response()->json(['genres' => $genres], 200);
    }

    public function show(Genre $genre)
    {
        $genre->load('movies');
        return response()->json(['genre' => $genre], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:genres',
        ]);

        $genre = Genre::create($validated);

        return response()->json(['message' => 'Genre created', 'genre' => $genre], 201);
    }

    public function update(Request $request, Genre $genre)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:genres,name,' . $genre->id,
        ]);

        $genre->update($validated);

        return response()->json(['message' => 'Genre updated', 'genre' => $genre], 200);
    }

    public function destroy(Genre $genre)
    {
        $genre->delete();

        return response()->json(['message' => 'Genre deleted'], 200);
    }
}