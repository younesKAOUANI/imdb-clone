import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  const checkAdmin = async () => {
    try {
      const { data } = await api.get('/user');
      setIsAdmin(data.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error.response?.data || error.message);
    }
  };
  if (isAuthenticated) checkAdmin();
}, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <nav className="w-full bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center text-lg font-semibold hover:text-accent">Home</Link>
            <Link to="/watchlist" className="flex items-center hover:text-accent">Watchlist</Link>
          </div>
          <div className="flex space-x-4 items-center">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hover:text-accent">Profile</Link>
                {isAdmin && (
                  <>
                    <Link to="/admin/dashboard" className="hover:text-accent">Dashboard</Link>
                    <Link to="/admin/movies" className="hover:text-accent">Movies</Link>
                    <Link to="/admin/actors" className="hover:text-accent">Actors</Link>
                    <Link to="/admin/genres" className="hover:text-accent">Genres</Link>
                    <Link to="/admin/realisateurs" className="hover:text-accent">Directors</Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-accent text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-accent">Login</Link>
                <Link to="/register" className="hover:text-accent">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;