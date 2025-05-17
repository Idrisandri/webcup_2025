// src/components/SignupStep2.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function SignupStep2() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState('joie');

  const emotions = [
    { value: 'joie', label: 'Joie' },
    { value: 'colere', label: 'Colère' },
    { value: 'regret', label: 'Regret' },
    { value: 'tristesse', label: 'Tristesse' },
    { value: 'peur', label: 'Peur' },
  ];

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
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="block font-medium mb-2">Choisissez votre émotion :</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {emotions.map(opt => (
          <div
            key={opt.value}
            onClick={() => setEmotion(opt.value)}
            className={`p-4 border rounded text-center cursor-pointer transition ${
              emotion === opt.value
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {opt.label}
          </div>
        ))}
      </div>
      <button type="submit" className="w-full py-2 rounded bg-green-600 text-white hover:bg-green-700">
        Terminer
      </button>
    </form>
  );
}
