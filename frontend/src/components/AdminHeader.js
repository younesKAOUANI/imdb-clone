import { Link, useNavigate } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4">
            <Link to="/admin" className="flex items-center text-lg font-semibold hover:text-accent">
              Admin Dashboard
            </Link>
            <Link to="/admin/movies" className="flex items-center hover:text-accent">
              Movies
            </Link>
            <Link to="/admin/actors" className="flex items-center hover:text-accent">
              Actors
            </Link>
            <Link to="/admin/genres" className="flex items-center hover:text-accent">
              Genres
            </Link>
            <Link to="/admin/realisateurs" className="flex items-center hover:text-accent">
              Directors
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="bg-accent text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;