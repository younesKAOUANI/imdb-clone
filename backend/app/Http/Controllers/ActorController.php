<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ActorController extends Controller
{
    public function index()
    {
        $actors = Actor::with('movies')->paginate(12);
        return response()->json(['actors' => $actors], 200);
    }

    public function show(Actor $actor)
    {
        $actor->load('movies');
        return response()->json(['actor' => $actor], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'birthdate' => 'required|date',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('actors', 'public');
        }

        $actor = Actor::create($validated);

        return response()->json(['message' => 'Actor created', 'actor' => $actor], 201);
    }

    public function update(Request $request, Actor $actor)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'birthdate' => 'sometimes|required|date',
            'bio' => 'nullable|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($actor->photo) {
                Storage::disk('public')->delete($actor->photo);
            }
            $validated['photo'] = $request->file('photo')->store('actors', 'public');
        }

        $actor->update($validated);

        return response()->json(['message' => 'Actor updated', 'actor' => $actor], 200);
    }

    public function destroy(Actor $actor)
    {
        if ($actor->photo) {
            Storage::disk('public')->delete($actor->photo);
        }

        $actor->delete();

        return response()->json(['message' => 'Actor deleted'], 200);
    }
}