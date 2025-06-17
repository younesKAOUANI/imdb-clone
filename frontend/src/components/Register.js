import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const { data } = await api.post('/register', { name, email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      const errorData = error.response?.data || error.message;
      console.error('Registration failed:', errorData);
      setErrors(errorData.errors || {});
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <div className="mt-6 space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
        </div>
        <button
          onClick={handleRegister}
          className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;