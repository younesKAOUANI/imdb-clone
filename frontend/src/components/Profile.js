import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await getProfile();
    setProfile(data);
    setName(data.name);
    setEmail(data.email);
  };

  const handleUpdate = async () => {
    try {
      await updateProfile({ name, email });
      alert('Profile updated');
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  if (!profile) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Profile</h2>
      <div className="mt-6 space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleUpdate}
          className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-orange-600 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;