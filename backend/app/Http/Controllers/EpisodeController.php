<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use App\Models\Movie;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    public function index(Movie $movie)
    {
        if ($movie->type !== 'series') {
            return response()->json(['message' => 'Not a series'], 400);
        }

        $episodes = $movie->episodes()->get();
        return response()->json(['episodes' => $episodes], 200);
    }

    public function store(Request $request, Movie $movie)
    {
        if ($movie->type !== 'series') {
            return response()->json(['message' => 'Not a series'], 400);
        }

        $validated = $request->validate([
            'season' => 'required|integer|min:1',
            'episode_number' => 'required|integer|min:1',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'runtime' => 'required|integer|min:1',
        ]);

        $episode = Episode::create(array_merge($validated, ['movie_id' => $movie->id]));

        return response()->json(['message' => 'Episode created', 'episode' => $episode], 201);
    }

    public function show(Movie $movie, Episode $episode)
    {
        if ($episode->movie_id !== $movie->id) {
            return response()->json(['message' => 'Episode not found'], 404);
        }

        return response()->json(['episode' => $episode], 200);
    }

    public function update(Request $request, Movie $movie, Episode $episode)
    {
        if ($episode->movie_id !== $movie->id) {
            return response()->json(['message' => 'Episode not found'], 404);
        }

        $validated = $request->validate([
            'season' => 'sometimes|required|integer|min:1',
            'episode_number' => 'sometimes|required|integer|min:1',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'runtime' => 'sometimes|required|integer|min:1',
        ]);

        $episode->update($validated);

        return response()->json(['message' => 'Episode updated', 'episode' => $episode], 200);
    }

    public function destroy(Movie $movie, Episode $episode)
    {
        if ($episode->movie_id !== $movie->id) {
            return response()->json(['message' => 'Episode not found'], 404);
        }

        $episode->delete();

        return response()->json(['message' => 'Episode deleted'], 200);
    }
}