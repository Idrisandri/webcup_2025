// src/pages/UserJoie.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import Publications from '../Components/Publications.jsx';

export default function UserJoie() {
  const navigate = useNavigate();
  const [publications, setPublications] = useState([]);

  /* 1) Déconnexion ------------------------------------------------------- */
  const handleLogout = async () => {
    try {
      await api.post('accounts/logout/');      // CSRF exempt côté back
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Erreur lors de la déconnexion :', err);
    }
  };

  /* 2) Navigation -------------------------------------------------------- */
  const goToChat          = () => navigate('/chat');
  const goToDisposition   = () => navigate('/disposition');
  const goToAddPublication = () => navigate('/add-publication');

  /* 3) Chargement des publications -------------------------------------- */
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await api.get('pages/publications/');
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.results)
            ? res.data.results
            : [];
        setPublications(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des publications :', err);
      }
    };
    fetchPublications();
  }, []);

  /* --------------------------------------------------------------------- */
  return (
    <div className="p-4 text-center space-y-6">
      <h1 className="text-2xl font-bold">
        🎉 Bienvenue dans l'univers de la joie ! 🎉
      </h1>

      {/* Boutons principaux */}
      <div className="flex justify-center space-x-4">
        <button onClick={goToChat}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Aller au Chat
        </button>
        <button onClick={goToDisposition}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Aller à Disposition
        </button>
        <button onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Déconnexion
        </button>
      </div>

      {/* Lien vers ajout de publication */}
      <button onClick={goToAddPublication}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600">
        ➕ Ajouter une publication
      </button>

      {/* Liste des publications */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">📌 Publications récentes :</h2>

        {publications.length > 0 ? (
          <Publications publications={publications} darkMode={false} />
        ) : (
          <p className="text-neutral-500">Aucune publication pour le moment.</p>
        )}
      </div>
    </div>
  );
}
