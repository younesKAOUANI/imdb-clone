<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WatchlistController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use App\Http\Controllers\Admin\AdminActorController;
use App\Http\Controllers\Admin\AdminGenreController;
use App\Http\Controllers\Admin\AdminRealisateurController;

use Illuminate\Support\Facades\Route;

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::get('/movies', [MovieController::class, 'index']);
Route::get('/movies/{id}', [MovieController::class, 'show']);
Route::post('/movies/{id}/ratings', [MovieController::class, 'addRating']);
Route::post('/movies/{id}/reviews', [ReviewController::class, 'store']);
Route::get('/movies/{id}/reviews', [ReviewController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'user']);
    Route::put('/profile', [UserController::class, 'update']);
    Route::get('/watchlist', [WatchlistController::class, 'index']);
    Route::post('/watchlist', [WatchlistController::class, 'store']);
    Route::put('/watchlist/{id}/watched', [WatchlistController::class, 'markAsWatched']);
    Route::delete('/watchlist/{id}', [WatchlistController::class, 'destroy']);

    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::apiResource('movies', AdminMovieController::class);
        Route::apiResource('actors', AdminActorController::class);
        Route::apiResource('genres', AdminGenreController::class);
        Route::apiResource('realisateurs', AdminRealisateurController::class);
    });
});