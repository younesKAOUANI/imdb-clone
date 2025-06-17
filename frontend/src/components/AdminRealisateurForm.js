import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminRealisateurForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [realisateur, setRealisateur] = useState({ fistName: '', lastName: '', birthDate: '' });

  useEffect(() => {
    if (id) {
      const fetchRealisateur = async () => {
        try {
          const { data } = await api.get(`/realisateurs/${id}`);
          setRealisateur(data.realisateur);
        } catch (error) {
          console.error('Error fetching director:', error);
        }
      };
      fetchRealisateur();
    }
  }, [id]);

  const handleChange = (e) => {
    setRealisateur({ ...realisateur, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/admin/realisateurs/${id}`, realisateur);
      } else {
        await api.post('/admin/realisateurs', realisateur);
      }
      navigate('/admin/realisateurs');
    } catch (error) {
      console.error('Error saving director:', error);
    }
  };

  const handleDelete = async () => {
    if (id) {
      try {
        await api.delete(`/admin/realisateurs/${id}`);
        navigate('/admin/realisateurs');
      } catch (error) {
        console.error('Error deleting director:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold">{id ? 'Edit Director' : 'Create Director'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mt-6 space-y-4">
        <input
          type="text"
          name="fistName"
          value={realisateur.fistName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="lastName"
          value={realisateur.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="birthDate"
          value={realisateur.birthDate}
          onChange={handleChange}
          placeholder="Birth Date"
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

export default AdminRealisateurForm;