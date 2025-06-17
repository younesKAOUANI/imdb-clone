<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Movie;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request, Movie $movie)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $rating = Rating::updateOrCreate(
            ['user_id' => $request->user()->id, 'movie_id' => $movie->id],
            ['rating' => $validated['rating']]
        );

        return response()->json(['message' => 'Rating submitted', 'rating' => $rating], 201);
    }

    public function update(Request $request, Movie $movie, Rating $rating)
    {
        if ($rating->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $rating->update($validated);

        return response()->json(['message' => 'Rating updated', 'rating' => $rating], 200);
    }

    public function destroy(Movie $movie, Rating $rating)
    {
        if ($rating->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $rating->delete();

        return response()->json(['message' => 'Rating deleted'], 200);
    }
}