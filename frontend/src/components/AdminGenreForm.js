import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGenre, createGenre, updateGenre, deleteGenre } from '../services/api';

function AdminGenreForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState({ name: '' });

  useEffect(() => {
    if (id) {
      const fetchGenre = async () => {
        try {
          const { data } = await getGenre(id);
          setGenre(data.genre);
        } catch (error) {
          console.error('Error fetching genre:', error);
        }
      };
      fetchGenre();
    }
  }, [id]);

  const handleChange = (e) => {
    setGenre({ ...genre, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateGenre(id, genre);
      } else {
        await createGenre(genre);
      }
      navigate('/admin/genres');
    } catch (error) {
      console.error('Error saving genre:', error);
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteGenre(id);
        navigate('/admin/genres');
      } catch (error) {
        console.error('Error deleting genre:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold">{id ? 'Edit Genre' : 'Create Genre'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-6 space-y-4">
        <input
          type="text"
          name="name"
          value={genre.name}
          onChange={handleChange}
          placeholder="Genre Name"
          className="w-full p-2 border rounded-md"
          required
        />
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

export default AdminGenreForm;