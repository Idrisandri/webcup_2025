// src/components/Publications.jsx
import React, { useEffect, useState } from 'react';
import api from '../api.js';                    // ← réutilise ton instance Axios
import { Eye, Heart, Share2, Clock, ArrowUpRight } from 'lucide-react';

/**
 * Affiche des cartes de publication
 *
 * Props
 * -----
 * - publications : tableau optionnel déjà chargé
 * - darkMode     : booléen pour thème sombre
 */
export default function Publications({ publications = null, darkMode = false }) {
  const [pages, setPages] = useState(
    Array.isArray(publications) ? publications : []
  );

  /* Charge depuis l’API seulement si aucune prop n’est passée */
  useEffect(() => {
    if (Array.isArray(publications)) return;      // rien à faire

    api
      .get('pages/publications/')                 // baseURL = http://localhost:8000/api/
      .then(res => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results ?? [];
        setPages(data);
      })
      .catch(err => console.error('Erreur API publications :', err));
  }, [publications]);

  /* Sécurité — s’assurer d’un tableau */
  if (!Array.isArray(pages) || pages.length === 0) {
    return (
      <p className="text-neutral-500 text-center">
        Aucune publication pour le moment.
      </p>
    );
  }

  /* ------------------------------------------------------------------- */
  return (
    <section className="mb-12">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 mr-2 text-red-500" />
        <h2 className="text-xl font-bold">Publications récentes</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.slice(0, 3).map(page => (
          <div
            key={page.id}
            className={`rounded-xl overflow-hidden group transition border ${
              darkMode
                ? 'bg-neutral-800 border-neutral-700'
                : 'bg-white border-neutral-200'
            } relative`}
          >
            {/* Mini-barre rouge décorative */}
            <div className="h-2 bg-neutral-500" />

            <div className="p-4">
              {/* Titre + auteur */}
              <div className="flex justify-between mb-3">
                <div>
                  <h3 className="font-bold group-hover:text-neutral-500">
                    {page.title}
                  </h3>
                  <div className="text-sm text-neutral-500">
                    par {page.author} • {page.timestamp}
                  </div>
                </div>

                {/* Emoji « tone » */}
                <span className="text-xl bg-neutral-700/30 rounded-full w-9 h-9 flex items-center justify-center">
                  {page.tone}
                </span>
              </div>

              {/* Description raccourcie */}
              <p className="text-sm text-neutral-600 mb-4">
                {page.description?.slice(0, 100)}…
              </p>

              {/* Statistiques + bouton lire */}
              <div className="flex justify-between text-neutral-400">
                <div className="flex space-x-3 text-sm">
                  <span>
                    <Eye className="inline w-4 h-4" /> {page.views ?? 0}
                  </span>
                  <span>
                    <Heart className="inline w-4 h-4" /> {page.reactions ?? 0}
                  </span>
                  <span>
                    <Share2 className="inline w-4 h-4" /> {page.shares ?? 0}
                  </span>
                </div>
                <button className="bg-neutral-500 text-white px-3 py-1 rounded-full flex items-center">
                  Lire <ArrowUpRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
