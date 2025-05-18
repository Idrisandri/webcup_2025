import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api.js';  // ton instance Axios

export default function PublicationDetail() {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reacted, setReacted] = useState(false); // Nouvel état pour suivre si l'utilisateur a réagi

  useEffect(() => {
    // Récupère la publication
    api.get(`pages/publications/${id}/`)
      .then(res => {
        setPublication(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur chargement publication :", err);
        setLoading(false);
      });
  }, [id]);

  const addOrRemoveReaction = () => {
    if (!publication) return;

    // Vérifie si l'utilisateur a déjà réagi
    if (reacted) {
      // Si oui, enlève la réaction
      api.patch(`pages/publications/${id}/`, {
        reactions: (publication.reactions || 0) - 1 // Diminue le nombre de réactions
      }).then(res => {
        setPublication(res.data); // Met à jour localement
        setReacted(false); // Marque comme non réagi
      }).catch(err => console.error("Erreur annulation reaction:", err));
    } else {
      // Si non, ajoute la réaction
      api.patch(`pages/publications/${id}/`, {
        reactions: (publication.reactions || 0) + 1 // Augmente le nombre de réactions
      }).then(res => {
        setPublication(res.data); // Met à jour localement
        setReacted(true); // Marque comme réagi
      }).catch(err => console.error("Erreur ajout reaction:", err));
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!publication) return <p>Publication introuvable.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{publication.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        par {publication.author} • {publication.timestamp}
      </p>
      <p className="mb-4">{publication.description}</p>

      {/* Image, Vidéo ou Audio */}
      {publication.image && <img src={publication.image} alt="" className="mb-4" />}
      {publication.video && <video controls src={publication.video} className="mb-4 w-full" />}
      {publication.music && <audio controls src={publication.music} className="mb-4 w-full" />}

      <div className="flex space-x-4 text-sm text-gray-600 mb-4">
        <span>👁️ {publication.views} vues</span>
        <span>❤️ {publication.reactions} réactions</span>
        <span>📤 {publication.shares} partages</span>
      </div>

      {/* Bouton pour réagir */}
      <button
        onClick={addOrRemoveReaction}
        className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${reacted ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {reacted ? '❤️ Annuler Réaction' : '❤️ Réagir'}
      </button>

      {/* Bouton pour partager */}
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full"
        onClick={() => {
          // Ici, tu peux implémenter la logique pour gérer les partages
          alert("Partage effectué !");
          // Exemple de requête API pour incrémenter les partages
          api.patch(`pages/publications/${id}/`, {
            shares: (publication.shares || 0) + 1
          }).then(res => {
            setPublication(res.data); // Met à jour localement
          }).catch(err => console.error("Erreur partage:", err));
        }}
      >
        Partager 📤
      </button>
    </div>
  );
}
