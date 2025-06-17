import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ensure this matches your Laravel API URL
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMovies = (params = {}) => api.get('/movies', { params });
export const getMovie = (id) => api.get(`/movies/${id}`);
export const getActors = () => api.get('/actors');
export const getActor = (id) => api.get(`/actors/${id}`);
export const getGenres = () => api.get('/genres');
export const getGenre = (id) => api.get(`/genres/${id}`);
export const createMovie = (data) => api.post('/admin/movies', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateMovie = (id, data) => api.put(`/admin/movies/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteMovie = (id) => api.delete(`/admin/movies/${id}`);
export const createActor = (data) => api.post('/admin/actors', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateActor = (id, data) => api.put(`/admin/actors/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteActor = (id) => api.delete(`/admin/actors/${id}`);
export const createGenre = (data) => api.post('/admin/genres', data);
export const updateGenre = (id, data) => api.put(`/admin/genres/${id}`, data);
export const deleteGenre = (id) => api.delete(`/admin/genres/${id}`);
export const addRating = (movieId, data) => api.post(`/movies/${movieId}/ratings`, data);
export const addReview = (movieId, data) => api.post(`/movies/${movieId}/reviews`, data);
export const getReviews = (movieId) => api.get(`/movies/${movieId}/reviews`);
export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);
export const getWatchlist = () => api.get('/watchlist');
export const addToWatchlist = (data) => api.post('/watchlist', data);
export const markAsWatched = (watchlistId) => api.post(`/watchlist/${watchlistId}/watched`);
export const removeFromWatchlist = (watchlistId) => api.delete(`/watchlist/${watchlistId}`);
export const login = (data) => api.post('/login', data);
export const register = (data) => api.post('/register');

export default api;