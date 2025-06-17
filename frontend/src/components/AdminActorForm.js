import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActor, createActor, updateActor, deleteActor } from '../services/api';

function AdminActorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState({ name: '', birthdate: '', bio: '', photo: null });

  useEffect(() => {
    if (id) {
      const fetchActor = async () => {
        try {
          const { data } = await getActor(id);
          setActor(data.actor);
        } catch (error) {
          console.error('Error fetching actor:', error);
        }
      };
      fetchActor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setActor({ ...actor, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(actor).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      if (id) {
        await updateActor(id, formData);
      } else {
        await createActor(formData);
      }
      navigate('/admin/actors');
    } catch (error) {
      console.error('Error saving actor:', error);
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteActor(id);
        navigate('/admin/actors');
      } catch (error) {
        console.error('Error deleting actor:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold">{id ? 'Edit Actor' : 'Create Actor'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-6 space-y-4">
        <input
          type="text"
          name="name"
          value={actor.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="birthdate"
          value={actor.birthdate}
          onChange={handleChange}
          placeholder="Birthdate"
          className="w-full p-2 border rounded-md"
          required
        />
        <textarea
          name="bio"
          value={actor.bio}
          onChange={handleChange}
          placeholder="Biography"
          className="w-full p-2 border rounded-md"
          rows="4"
        />
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border rounded-md"
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

export default AdminActorForm;