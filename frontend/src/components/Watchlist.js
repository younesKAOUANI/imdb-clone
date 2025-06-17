import { useState, useEffect } from 'react';
import { getWatchlist, addToWatchlist, markAsWatched, removeFromWatchlist } from '../services/api';
import { Link } from 'react-router-dom';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [movieId, setMovieId] = useState('');

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const { data } = await getWatchlist();
      setWatchlist(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      setWatchlist([]);
    }
  };

  const handleAddToWatchlist = async () => {
    if (movieId) {
      await addToWatchlist({ movie_id: movieId });
      setMovieId('');
      fetchWatchlist();
    }
  };

  const handleMarkAsWatched = async (watchlistId) => {
    await markAsWatched(watchlistId);
    fetchWatchlist();
  };

  const handleRemove = async (watchlistId) => {
    await removeFromWatchlist(watchlistId);
    fetchWatchlist();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold">My Watchlist</h2>
      <div className="flex gap-4 mt-4">
        <input
          type="text"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder="Enter Movie ID to add"
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={handleAddToWatchlist}
          className="px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-600 transition"
        >
          Add to Watchlist
        </button>
      </div>
      {watchlist.length === 0 ? (
        <p className="mt-6 text-gray-600">No movies in watchlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {watchlist.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <img
                src={item.movie.poster_path ? `/storage/${item.movie.poster_path}` : 'https://via.placeholder.com/200x300'}
                alt={item.movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{item.movie.title}</h3>
                <p className="text-sm text-gray-600">{item.movie.release_date}</p>
                <p className="text-sm">{item.watched ? 'Watched' : 'Not Watched'}</p>
                <Link to={`/movies/${item.movie.id}`} className="text-accent hover:underline">Details</Link>
                <div className="flex gap-2 mt-2">
                  {!item.watched && (
                    <button
                      onClick={() => handleMarkAsWatched(item.id)}
                      className="px-2 py-1 bg-secondary text-white rounded-md hover:bg-gray-600 transition"
                    >
                      Mark Watched
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;