import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('accounts/login/', creds);
      // Redirection unique vers la page émotion
      navigate(`/user/${data.emotion}`);
    } catch (err) {
      console.error(err.response || err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <input
        name="email"
        type="email"
        value={creds.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        type="password"
        value={creds.password}
        onChange={handleChange}
        placeholder="Mot de passe"
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full py-2 rounded bg-indigo-600 text-white">
        Se connecter
      </button>
    </form>
  );
}
