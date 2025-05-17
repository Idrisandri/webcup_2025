import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', date_of_birth: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('accounts/signup-step1/', formData);
      navigate('/signup-step2', { state: { userId: data.user_id } });
    } catch (err) {
      console.error(err.response || err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Nom"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Mot de passe"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="date_of_birth"
        type="date"
        value={formData.date_of_birth}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white">
        Suivant
      </button>
    </form>
  );
}