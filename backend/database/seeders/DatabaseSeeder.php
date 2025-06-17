<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Movie;
use App\Models\Actor;
use App\Models\Genre;
use App\Models\Realisateur;
use App\Models\Watchlist;
use App\Models\Rating;
use App\Models\Review;
use App\Models\Episode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Disable foreign key checks to avoid constraint violations
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate all tables
        User::truncate();
        Movie::truncate();
        Actor::truncate();
        Genre::truncate();
        Realisateur::truncate();
        Watchlist::truncate();
        Rating::truncate();
        Review::truncate();
        Episode::truncate();
        DB::table('genre_movie')->truncate();
        DB::table('actor_movie')->truncate();

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Admin User
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin'), // Password: admin123
            'role' => 'admin',
        ]);

        // Regular User
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'password' => Hash::make('user123'), // Password: user123
            'role' => 'user',
        ]);

        // Genres
        Genre::insert([
            ['name' => 'Action'],
            ['name' => 'Drama'],
            ['name' => 'Sci-Fi'],
        ]);

        $action = Genre::where('name', 'Action')->first();
        $drama = Genre::where('name', 'Drama')->first();
        $sciFi = Genre::where('name', 'Sci-Fi')->first();

        // Actors
        $actor1 = Actor::create([
            'name' => 'Leonardo DiCaprio',
            'birthdate' => '1974-11-11',
            'bio' => 'Academy Award-winning actor.',
            'photo' => 'actors/leonardo.jpg',
        ]);

        $actor2 = Actor::create([
            'name' => 'Scarlett Johansson',
            'birthdate' => '1984-11-22',
            'bio' => 'Versatile actress known for Marvel roles.',
            'photo' => 'actors/scarlett.jpg',
        ]);

        // Realisateurs (Directors)
        $director1 = Realisateur::create([
            'fistName' => 'Christopher',
            'lastName' => 'Nolan',
            'birthDate' => '1970-07-30',
        ]);

        $director2 = Realisateur::create([
            'fistName' => 'Quentin',
            'lastName' => 'Tarantino',
            'birthDate' => '1963-03-27',
        ]);

        // Movies
        $movie1 = Movie::create([
            'title' => 'Inception',
            'description' => 'A thief enters dreams to steal secrets.',
            'release_year' => 2010,
            'runtime' => 148,
            'director' => 'Christopher Nolan',
            'trailer_link' => 'https://youtube.com/inception',
            'poster_image' => 'posters/inception.jpg',
            'cover_image' => 'covers/inception.jpg',
            'type' => 'movie',
        ]);

        $movie2 = Movie::create([
            'title' => 'Pulp Fiction',
            'description' => 'Interwoven stories of crime and redemption.',
            'release_year' => 1994,
            'runtime' => 154,
            'director' => 'Quentin Tarantino',
            'trailer_link' => 'https://youtube.com/pulpfiction',
            'poster_image' => 'posters/pulpfiction.jpg',
            'cover_image' => 'covers/pulpfiction.jpg',
            'type' => 'movie',
        ]);

        $series1 = Movie::create([
            'title' => 'Stranger Things',
            'description' => 'A group of friends face supernatural threats.',
            'release_year' => 2016,
            'runtime' => 50,
            'director' => 'Duffer Brothers',
            'trailer_link' => 'https://youtube.com/strangerthings',
            'poster_image' => 'posters/strangerthings.jpg',
            'cover_image' => 'covers/strangerthings.jpg',
            'type' => 'series',
        ]);

        // Attach Genres and Actors to Movies
        $movie1->genres()->attach([$action->id, $sciFi->id]);
        $movie1->actors()->attach([$actor1->id]);
        $movie2->genres()->attach([$drama->id]);
        $movie2->actors()->attach([$actor2->id]);
        $series1->genres()->attach([$sciFi->id, $drama->id]);
        $series1->actors()->attach([$actor2->id]);

        // Episodes for Series
        Episode::create([
            'movie_id' => $series1->id,
            'season' => 1,
            'episode_number' => 1,
            'title' => 'Chapter One: The Vanishing',
            'description' => 'Will goes missing after a game.',
            'runtime' => 47,
        ]);

        // Watchlist
        Watchlist::create([
            'user_id' => $user->id,
            'movie_id' => $movie1->id,
        ]);

        // Ratings
        Rating::create([
            'user_id' => $user->id,
            'movie_id' => $movie1->id,
            'rating' => 5,
        ]);

        // Reviews
        Review::create([
            'user_id' => $user->id,
            'movie_id' => $movie1->id,
            'rating' => 5,
            'review' => 'Amazing movie with mind-bending plot!',
        ]);
    }
}