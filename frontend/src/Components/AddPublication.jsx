// src/pages/AddPublication.jsx
import React, { useState, useEffect } from 'react';
import api from '../api.js';

/**
 * Formulaire d’ajout de publication
 *
 * Props
 * -----
 * - authorId           : ID de l’utilisateur connecté
 * - onPublicationAdded : callback appelé après succès
 */
export default function AddPublication({ authorId, onPublicationAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [tone, setTone] = useState('🙌');
  const [loading, setLoading] = useState(false);

  /** Récupère un cookie csrftoken dès le montage */
  useEffect(() => {
    api.get('pages/csrf/').catch(() => {
      // La route renvoie juste 200 + cookie ― pas d’action requise
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('tone', tone);
    formData.append('author', authorId); // sera ignoré côté serveur si you override perform_create

    try {
      // IMPORTANT : ne PAS fixer Content-Type ; Axios gère la boundary.
      await api.post('pages/publications/', formData, { withCredentials: true });

      alert('Publication ajoutée avec succès 🎉');
      setTitle('');
      setDescription('');
      setImage(null);
      setTone('🙌');
      onPublicationAdded?.();
    } catch (err) {
      console.error('Erreur lors de l’ajout :', err);
      alert(`Erreur lors de l'ajout : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Créer une Publication 🚀</h2>

      <label className="block mb-2 font-semibold">Titre :</label>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2 font-semibold">Description :</label>
      <textarea
        rows="4"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2 font-semibold">Image :</label>
      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
        accept="image/*"
        className="w-full mb-4"
      />

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
