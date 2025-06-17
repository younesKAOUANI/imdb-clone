import { useState, useEffect, useCallback } from 'react';
import { getMovies } from '../services/api';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

const fetchMovies = useCallback(async (search = '', genre = '', actor = '') => {
  try {
    const { data } = await getMovies({ search, genre, actor, page });
    console.log('Full API response:', data); // Add this
    setMovies(data.movies.data);
    console.log('Fetched movies:', data.movies.data);
  } catch (error) {
    console.error('Fetch error:', error.response || error.message);
  }
}, [page]);
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchBar onSearch={fetchMovies} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-secondary text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-gray-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MovieList;