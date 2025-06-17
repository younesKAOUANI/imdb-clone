<?php

namespace App\Http\Controllers;

use App\Models\Realisateur;
use Illuminate\Http\Request;

class RealisateurController extends Controller
{
    public function index()
    {
        $realisateurs = Realisateur::with('films')->paginate(12);
        return response()->json(['realisateurs' => $realisateurs], 200);
    }

    public function show(Realisateur $realisateur)
    {
        $realisateur->load('films');
        return response()->json(['realisateur' => $realisateur], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fistName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'birthDate' => 'required|date',
        ]);

        $realisateur = Realisateur::create($validated);

        return response()->json(['message' => 'Director created', 'realisateur' => $realisateur], 201);
    }

    public function update(Request $request, Realisateur $realisateur)
    {
        $validated = $request->validate([
            'fistName' => 'sometimes|required|string|max:255',
            'lastName' => 'sometimes|required|string|max:255',
            'birthDate' => 'sometimes|required|date',
        ]);

        $realisateur->update($validated);

        return response()->json(['message' => 'Director updated', 'realisateur' => $realisateur], 200);
    }

    public function destroy(Realisateur $realisateur)
    {
        $realisateur->delete();

        return response()->json(['message' => 'Director deleted'], 200);
    }
}