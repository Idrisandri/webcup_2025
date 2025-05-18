// src/components/Publications.jsx
import React, { useEffect, useState } from 'react';
import api from '../api.js';
import { Eye, Heart, Share2, Clock, ArrowUpRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Publications({ publications = null, darkMode = false }) {
  const [pages, setPages] = useState(Array.isArray(publications) ? publications : []);
  const [mostReactionsPub, setMostReactionsPub] = useState(null);

  /* Charge depuis l'API seulement si aucune prop n'est passée */
  useEffect(() => {
    if (Array.isArray(publications)) {
      // Si les publications sont passées en props, trouvez celle avec le plus de réactions
      findMostReactions(publications);
      return;
    }

    api
      .get('pages/publications/')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results ?? [];
        setPages(data);
        findMostReactions(data);
      })
      .catch(err => console.error('Erreur API publications :', err));
  }, [publications]);

  // Trouve la publication avec le plus de réactions
  const findMostReactions = (publications) => {
    if (!Array.isArray(publications) || publications.length === 0) return;

    const mostReactions = publications.reduce((prev, current) =>
      (prev.reactions > current.reactions) ? prev : current
    );
    setMostReactionsPub(mostReactions);
  };

  /* Sécurité — s'assurer d'un tableau */
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
      {/* Section "Publication la plus populaire" */}
      {mostReactionsPub && (
        <>
          <h2 className={`flex items-center text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-neutral-800'
            }`}>
            <Trophy className="w-5 h-5 mr-2 my-5 text-yellow-500" />
            Publication la plus populaire
          </h2>
          <div className="mb-8  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">

            <div className={`rounded-xl overflow-hidden group transition border${darkMode
                ? 'bg-neutral-800 border-neutral-700'
                : 'bg-white border-neutral-200'
              } relative`}>
              <div className="h-2 bg-neutral-500" /> {/* Barre jaune pour la mise en avant */}

              <div className="p-4">
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-neutral-500">
                      {mostReactionsPub.title}
                    </h3>
                    <div className="text-sm text-neutral-500">
                      par {mostReactionsPub.author} • {mostReactionsPub.timestamp}
                    </div>
                  </div>

                  <span className="text-xl bg-yellow-500/20 rounded-full w-9 h-9 flex items-center justify-center">
                    {mostReactionsPub.tone}
                  </span>
                </div>

                <p className="text-sm text-neutral-600 mb-4">
                  {mostReactionsPub.description?.slice(0, 150)}...
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-neutral-400">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1 text-red-500" />
                      {mostReactionsPub.reactions} réactions
                    </span>
                  </div>

                  <Link
                    to={`/publication/${mostReactionsPub.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center hover:bg-yellow-600 transition"
                  >
                    Lire <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Liste des autres publications */}
      <h2 className={`text-xl font-bold my-5 text-start flex items-center gap-3 ${darkMode ? 'text-white' : 'text-neutral-800'
        }`}>
        <Clock/> Dernières publications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages
          .filter(page => !mostReactionsPub || page.id !== mostReactionsPub.id)
          .slice(0, 3)
          .map(page => (
            <div
              key={page.id}
              className={`rounded-xl overflow-hidden group transition border ${darkMode
                  ? 'bg-neutral-800 border-neutral-700'
                  : 'bg-white border-neutral-200'
                } relative`}
            >
              <div className="h-2 bg-neutral-500" />

              <div className="p-4">
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-bold group-hover:text-neutral-500">
                      {page.title}
                    </h3>
                    <div className="text-sm text-neutral-500">
                      par {page.author} • {page.timestamp}
                    </div>
                  </div>

                  <span className="text-xl bg-neutral-700/30 rounded-full w-9 h-9 flex items-center justify-center">
                    {page.tone}
                  </span>
                </div>

                <p className="text-sm text-neutral-600 mb-4">
                  {page.description?.slice(0, 100)}…
                </p>

                <div className="flex justify-between text-neutral-400">
                  <Link
                    to={`/publication/${page.id}`}
                    className="bg-neutral-500 text-white px-3 py-1 rounded-full flex items-center"
                  >
                    Lire <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}