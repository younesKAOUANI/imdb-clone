import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie, addRating, addReview, getReviews } from '../services/api';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(''); // Keep as string for input
  const [review, setReview] = useState('');

  useEffect(() => {
    fetchMovie();
    fetchReviews();
  }, [id]);

  const fetchMovie = async () => {
    const { data } = await getMovie(id);
    setMovie(data.movie);
  };

  const fetchReviews = async () => {
    const { data } = await getReviews(id);
    setReviews(data);
  };

  const handleRating = async () => {
    if (!rating || rating < 1 || rating > 5) {
      alert('Please enter a rating between 1 and 5.');
      return;
    }
    try {
      await addRating(id, { rating: parseInt(rating) });
      fetchMovie();
      setRating('');
    } catch (error) {
      console.error('Rating error:', error.response?.data || error.message);
    }
  };

  const handleReview = async () => {
    if (!review.trim()) {
      alert('Please enter a review.');
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      alert('Please enter a rating between 1 and 5.');
      return;
    }
    try {
      await addReview(id, { review, rating: parseInt(rating) });
      setReview('');
      setRating('');
      fetchReviews();
    } catch (error) {
      console.error('Review error:', error.response?.data || error.message);
      alert('Failed to submit review: ' + (error.response?.data.message || error.message));
    }
  };

  if (!movie) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={movie.poster_image ? `/storage/${movie.poster_image}` : 'https://dummyimage.com/200x300/fff/001.png'}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-gray-600 mt-2">{movie.description}</p>
            <p className="mt-2"><strong>Release:</strong> {movie.release_year}</p>
            <p><strong>Duration:</strong> {movie.runtime} minutes</p>
            <p><strong>Rating:</strong> {movie.ratings_avg_rating || 'No ratings'}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Rate and Review</h3>
          <div className="flex flex-col gap-4 mt-2">
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating (1-5)"
              className="w-20 p-2 border rounded-md"
            />
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 border rounded-md"
              rows="4"
            />
            <div className="flex gap-4">
              <button
                onClick={handleRating}
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-600 transition"
              >
                Submit Rating
              </button>
              <button
                onClick={handleReview}
                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-600 transition"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Reviews</h3>
          <div className="mt-4 space-y-4">
{Array.isArray(reviews) && reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev.id} className="bg-gray-100 p-4 rounded-md">
                  <p>{rev.content} - <strong>{rev.user.name}</strong></p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;