import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/movies');
                console.log('API Response:', response.data); // Debug log
                setMovies(response.data.movies.data);
                setLoading(false);
            } catch (err) {
                console.error('Error details:', err); // Debug log
                setError('Error fetching movies: ' + err.message);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Movies</h1>
            {movies.length === 0 ? (
                <p>No movies found. Please add some movies to the database.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movies.map(movie => (
                        <div key={movie.id} className="border rounded-lg p-4 shadow">
                            <h2 className="text-xl font-semibold">{movie.title}</h2>
                            <p className="text-gray-600">{movie.description}</p>
                            <div className="mt-2">
                                <span className="text-sm text-gray-500">
                                    Release Date: {new Date(movie.release_date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieList; 