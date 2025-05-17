import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function UserJoie() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Appel POST /api/accounts/logout/
      await api.post('accounts/logout/');
    } catch (err) {
      console.error('Erreur lors de la déconnexion :', err);
    }
    // Redirection vers la page de connexion
    navigate('/login', { replace: true });
  };

  const goToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="p-4 text-center space-y-6">
      <div>🎉 Bienvenue dans l'univers de la joie ! 🎉</div>
      <button
        onClick={goToChat}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Aller au Chat
      </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Déconnexion
      </button>
    </div>
  );
}