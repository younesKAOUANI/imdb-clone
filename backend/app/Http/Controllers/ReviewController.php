<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Movie;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Movie $movie)
    {
        $reviews = $movie->reviews()->with('user')->get();
        return response()->json(['reviews' => $reviews], 200);
    }

    public function store(Request $request, Movie $movie)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
        ]);

        $review = Review::create([
            'user_id' => $request->user()->id,
            'movie_id' => $movie->id,
            'rating' => $validated['rating'],
            'review' => $validated['review'],
        ]);

        return response()->json(['message' => 'Review created', 'review' => $review->load('user')], 201);
    }

    public function update(Request $request, Movie $movie, Review $review)
    {
        if ($review->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'review' => 'sometimes|required|string',
        ]);

        $review->update($validated);

        return response()->json(['message' => 'Review updated', 'review' => $review->load('user')], 200);
    }

    public function destroy(Movie $movie, Review $review)
    {
        if ($review->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted'], 200);
    }
}