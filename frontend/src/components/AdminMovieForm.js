import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie, createMovie, updateMovie, deleteMovie, getGenres, getActors } from '../services/api';

function AdminMovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '', description: '', release_year: '', runtime: '', director: '', trailer_link: '', poster_image: null, cover_image: null, type: 'movie', genres: [], actors: []
  });
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresData, actorsData] = await Promise.all([getGenres(), getActors()]);
        setGenres(genresData.data.genres.data);
        setActors(actorsData.data.actors.data);
        if (id) {
          const { data } = await getMovie(id);
          setMovie({
            ...data.movie,
            genres: data.movie.genres.map(g => g.id),
            actors: data.movie.actors.map(a => a.id)
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setMovie({ ...movie, [name]: files ? files[0] : value });
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const values = Array.from(options).filter(opt => opt.selected).map(opt => parseInt(opt.value));
    setMovie({ ...movie, [name]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(movie).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(`${key}[]`, v));
      } else if (value) {
        formData.append(key, value);
      }
    });

    try {
      if (id) {
        await updateMovie(id, formData);
      } else {
        await createMovie(formData);
      }
      navigate('/admin/movies');
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteMovie(id);
        navigate('/admin/movies');
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold">{id ? 'Edit Movie' : 'Create Movie'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-6 space-y-4">
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          name="description"
          value={movie.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded-md"
          rows="4"
          required
        />
        <input
          type="number"
          name="release_year"
          value={movie.release_year}
          onChange={handleChange}
          placeholder="Release Year"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="number"
          name="runtime"
          value={movie.runtime}
          onChange={handleChange}
          placeholder="Runtime (minutes)"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          placeholder="Director"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="url"
          name="trailer_link"
          value={movie.trailer_link}
          onChange={handleChange}
          placeholder="Trailer Link"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="file"
          name="poster_image"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="file"
          name="cover_image"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border rounded-md"
        />
        <select
          name="type"
          value={movie.type}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        <select
          name="genres"
          multiple
          value={movie.genres}
          onChange={handleMultiSelect}
          className="w-full p-2 border rounded-md"
          required
        >
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <select
          name="actors"
          multiple
          value={movie.actors}
          onChange={handleMultiSelect}
          className="w-full p-2 border rounded-md"
          required
        >
          {actors.map(actor => (
            <option key={actor.id} value={actor.id}>{actor.name}</option>
          ))}
        </select>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-600 transition"
          >
            {id ? 'Update' : 'Create'}
          </button>
          {id && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminMovieForm;