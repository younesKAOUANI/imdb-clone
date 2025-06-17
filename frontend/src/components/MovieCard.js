import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={movie.poster_path ? `/storage/${movie.poster_path}` : 'https://dummyimage.com/200x300/fff/001.png'}
        alt={movie.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
        <Link
          to={`/movies/${movie.id}`}
          className="mt-2 inline-block text-accent hover:underline"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;