// src/pages/AddPublication.jsx
import React, { useState, useEffect } from 'react';
import api from '../api.js';

/**
 * Formulaire d’ajout de publication (image + vidéo + musique)
 *
 * Props
 * -----
 * - authorId           : ID de l’utilisateur connecté
 * - onPublicationAdded : callback appelé après succès
 */
export default function AddPublication({ authorId, onPublicationAdded }) {
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage]           = useState(null);
  const [video, setVideo]           = useState(null);   // ← NEW
  const [music, setMusic]           = useState(null);   // ← NEW
  const [tone, setTone]             = useState('🙌');
  const [loading, setLoading]       = useState(false);

  /* ── Récupère le cookie CSRF dès le montage ───────────────────── */
  useEffect(() => { api.get('pages/csrf/').catch(() => {}); }, []);

  /* ── Soumission ──────────────────────────────────────────────── */
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);   // ← NEW
    if (music) formData.append('music', music);   // ← NEW
    formData.append('tone', tone);
    formData.append('author', authorId);          // sera ignoré si perform_create fixe l’auteur

    try {
      await api.post('pages/publications/', formData, { withCredentials: true });
      alert('Publication ajoutée avec succès 🎉');

      /* Réinitialisation du formulaire */
      setTitle('');
      setDescription('');
      setImage(null);
      setVideo(null);
      setMusic(null);
      setTone('🙌');
      onPublicationAdded?.();
    } catch (err) {
      console.error('Erreur lors de l’ajout :', err);
      alert(`Erreur lors de l'ajout : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* ── Rendu ───────────────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold mb-4">Créer une Publication 🚀</h2>

      {/* Titre ----------------------------------------------------- */}
      <label className="block mb-2 font-semibold">Titre :</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Description ----------------------------------------------- */}
      <label className="block mb-2 font-semibold">Description :</label>
      <textarea
        rows="4"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* Image ----------------------------------------------------- */}
      <label className="block mb-2 font-semibold">Image (optionnel) :</label>
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
        className="w-full mb-4"
      />

      {/* Vidéo ----------------------------------------------------- */}
      <label className="block mb-2 font-semibold">Vidéo (optionnel) :</label>
      <input
        type="file"
        accept="video/*"
        onChange={e => setVideo(e.target.files[0])}
        className="w-full mb-4"
      />

      {/* Musique --------------------------------------------------- */}
      <label className="block mb-2 font-semibold">Musique (optionnel) :</label>
      <input
        type="file"
        accept="audio/*"
        onChange={e => setMusic(e.target.files[0])}
        className="w-full mb-4"
      />

      {/* Ton ------------------------------------------------------- */}
      <label className="block mb-2 font-semibold">Ton :</label>
      <select
        value={tone}
        onChange={e => setTone(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="😒">😒 Passif-agressif</option>
        <option value="🙌">🙌 Honnête</option>
        <option value="😂">😂 Ironique</option>
        <option value="😢">😢 Touchant</option>
        <option value="✨">✨ Classe</option>
      </select>

      {/* Bouton ----------------------------------------------------- */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 bg-blue-500 text-white rounded ${
          loading ? 'opacity-50 cursor-wait' : 'hover:bg-blue-600'
        }`}
      >
        {loading ? 'Envoi en cours…' : 'Ajouter la publication'}
      </button>
    </form>
  );
}
