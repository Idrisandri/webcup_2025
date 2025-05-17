// src/components/SignupStep2.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function SignupStep2() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState('joie');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('accounts/signup-step2/', { user_id: state.userId, emotion });
      navigate('/login');
    } catch (err) {
      console.error(err.response || err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <label className="block font-medium">Choisissez votre émotion :</label>
      <select
        value={emotion}
        onChange={e => setEmotion(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="joie">Joie</option>
        <option value="colere">Colère</option>
        <option value="regret">Regret</option>
        <option value="tristesse">Tristesse</option>
        <option value="peur">Peur</option>
      </select>
      <button type="submit" className="w-full py-2 rounded bg-green-600 text-white">
        Terminer
      </button>
    </form>
  );
}