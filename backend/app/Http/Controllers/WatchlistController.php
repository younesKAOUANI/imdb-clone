<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    public function index(Request $request)
    {
        $watchlist = Watchlist::where('user_id', $request->user()->id)->with('movie')->get();
        return response()->json(['watchlist' => $watchlist], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'movie_id' => 'required|exists:movies,id',
        ]);

        $watchlist = Watchlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'movie_id' => $validated['movie_id'],
        ]);

        return response()->json(['message' => 'Added to watchlist', 'watchlist' => $watchlist->load('movie')], 201);
    }

    public function markAsWatched(Request $request, Watchlist $watchlist)
    {
        if ($watchlist->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $watchlist->update(['watched' => true]);

        return response()->json(['message' => 'Marked as watched', 'watchlist' => $watchlist->load('movie')], 200);
    }

    public function destroy(Watchlist $watchlist)
    {
        if ($watchlist->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $watchlist->delete();

        return response()->json(['message' => 'Removed from watchlist'], 200);
    }
}