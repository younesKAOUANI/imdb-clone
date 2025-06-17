import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Watchlist from './components/Watchlist';
import AdminDashboard from './components/AdminDashboard';
import AdminMovieForm from './components/AdminMovieForm';
import AdminActorForm from './components/AdminActorForm';
import AdminGenreForm from './components/AdminGenreForm';
import AdminRealisateurForm from './components/AdminRealisateurForm';
import api from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data } = await api.get('/user');
        setIsAdmin(data.role === 'admin');
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    if (isAuthenticated) checkAdmin();
  }, [isAuthenticated]);

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (adminOnly && !isAdmin) return <Navigate to="/" />;
    return children;
  };

  const AdminLayout = ({ children }) => (
    <div>
      <AdminHeader />
      {children}
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <div>
              <Header />
              <MovieList />
            </div>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <div>
              <Header />
              <MovieDetail />
            </div>
          }
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div>
                <Header />
                <Profile />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <div>
                <Header />
                <Watchlist />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminMovieForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/movies/:id/edit"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminMovieForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/actors"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminActorForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/actors/:id/edit"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminActorForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/genres"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminGenreForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/genres/:id/edit"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminGenreForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/realisateurs"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminRealisateurForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/realisateurs/:id/edit"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout>
                <AdminRealisateurForm />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;