<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{
    public function index(Request $request)
{
    $query = Movie::query();

    // Search by title or description
    if ($search = $request->query('search')) {
        $search = trim($search); // Remove extra spaces
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    // Filter by genre
    if ($genre = $request->query('genre')) {
        $genre = trim($genre);
        $query->whereHas('genres', function ($q) use ($genre) {
            $q->where('name', 'like', "%{$genre}%"); // Use 'like' for partial matches
        });
    }

    // Filter by actor
    if ($actor = $request->query('actor')) {
        $actor = trim($actor);
        $query->whereHas('actors', function ($q) use ($actor) {
            $q->where('name', 'like', "%{$actor}%"); // Use 'like' for partial matches
        });
    }

    $movies = $query->with(['genres', 'actors'])->paginate(12);

    return response()->json(['movies' => $movies], 200);
}

    public function show(Movie $movie)
    {
        $movie->load(['genres', 'actors', 'reviews.user', 'ratings']);
        $movie->loadAvg('ratings', 'rating');

        return response()->json(['movie' => $movie], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'release_year' => 'required|integer',
            'runtime' => 'required|integer|min:1',
            'director' => 'required|string',
            'trailer_link' => 'nullable|url',
            'poster_image' => 'nullable|image|max:2048',
            'cover_image' => 'nullable|image|max:2048',
            'type' => 'required|in:movie,series',
            'genres' => 'required|array|min:1',
            'genres.*' => 'exists:genres,id',
            'actors' => 'required|array|min:1',
            'actors.*' => 'exists:actors,id',
        ]);

        if ($request->hasFile('poster_image')) {
            $validated['poster_image'] = $request->file('poster_image')->store('posters', 'public');
        }
        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        $movie = Movie::create($validated);
        $movie->genres()->attach($validated['genres']);
        $movie->actors()->attach($validated['actors']);

        return response()->json(['message' => 'Movie created', 'movie' => $movie->load(['genres', 'actors'])], 201);
    }

    public function update(Request $request, Movie $movie)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'release_year' => 'sometimes|required|integer',
            'runtime' => 'sometimes|required|integer|min:1',
            'director' => 'sometimes|required|string',
            'trailer_link' => 'nullable|url',
            'poster_image' => 'nullable|image|max:2048',
            'cover_image' => 'nullable|image|max:2048',
            'type' => 'sometimes|required|in:movie,series',
            'genres' => 'sometimes|required|array|min:1',
            'genres.*' => 'exists:genres,id',
            'actors' => 'sometimes|required|array|min:1',
            'actors.*' => 'exists:actors,id',
        ]);

        if ($request->hasFile('poster_image')) {
            if ($movie->poster_image) {
                Storage::disk('public')->delete($movie->poster_image);
            }
            $validated['poster_image'] = $request->file('poster_image')->store('posters', 'public');
        }
        if ($request->hasFile('cover_image')) {
            if ($movie->cover_image) {
                Storage::disk('public')->delete($movie->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        $movie->update($validated);
        if ($request->has('genres')) {
            $movie->genres()->sync($validated['genres']);
        }
        if ($request->has('actors')) {
            $movie->actors()->sync($validated['actors']);
        }

        return response()->json(['message' => 'Movie updated', 'movie' => $movie->load(['genres', 'actors'])], 200);
    }

    public function destroy(Movie $movie)
    {
        if ($movie->poster_image) {
            Storage::disk('public')->delete($movie->poster_image);
        }
        if ($movie->cover_image) {
            Storage::disk('public')->delete($movie->cover_image);
        }

        $movie->delete();

        return response()->json(['message' => 'Movie deleted'], 200);
    }
}