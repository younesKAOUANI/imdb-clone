import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error.response?.data || error.message);
        if (error.response?.status === 403) {
          navigate('/login');
        }
      }
    };
    fetchStats();
  }, [navigate]);

  if (!stats) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Movies</h3>
          <p className="text-2xl mt-2">{stats.movies_count}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Actors</h3>
          <p className="text-2xl mt-2">{stats.actors_count}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Genres</h3>
          <p className="text-2xl mt-2">{stats.genres_count}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;