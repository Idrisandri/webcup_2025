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

  // Fonction pour attribuer une couleur basée sur le ton (en utilisant uniquement des neutres)
  const getToneColor = (tone) => {
    const toneMap = {
      '📝': 'bg-neutral-400',
      '🔥': 'bg-neutral-500',
      '✨': 'bg-neutral-600',
      '🌱': 'bg-neutral-700',
      '💜': 'bg-neutral-800',
      '💙': 'bg-neutral-900',
    };
    return toneMap[tone] || 'bg-neutral-500';
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
    <section className="mb-12 relative">
      {/* Éléments décoratifs en fond */}
      <div className="hidden md:block absolute -z-10 w-full h-full overflow-hidden pointer-events-none">
        <div className="bubble bg-neutral-200/20 w-24 h-24 rounded-full absolute top-10 left-10"></div>
        <div className="bubble bg-neutral-300/20 w-16 h-16 rounded-full absolute top-40 right-20"></div>
        <div className="bubble bg-neutral-400/10 w-32 h-32 rounded-full absolute bottom-20 left-40"></div>
        <div className="bubble bg-neutral-500/10 w-20 h-20 rounded-full absolute bottom-10 right-40"></div>
      </div>

      {/* Section "Publication la plus populaire" */}
      {mostReactionsPub && (
        <>
          <h2 className={`flex items-center text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-neutral-800'}`}>
            <Trophy className="w-5 h-5 mr-2 my-5 text-neutral-600 animate-pulse" />
            Publication la plus populaire
          </h2>
          <div className="mb-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div 
              className={`rounded-xl overflow-hidden group transition border hover:shadow-lg transform hover:-translate-y-1 duration-300 ${
                darkMode
                  ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'
                  : 'bg-white border-neutral-200 hover:border-neutral-400'
              } relative`}
            >
              <div className={`h-2 ${getToneColor(mostReactionsPub.tone)} transition-all duration-300 group-hover:h-3`} />

              <div className="p-4">
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-neutral-600 transition-colors duration-200">
                      {mostReactionsPub.title}
                    </h3>
                    <div className="text-sm text-neutral-500">
                      par {mostReactionsPub.author} • {mostReactionsPub.timestamp}
                    </div>
                  </div>

                  <span className={`text-xl ${getToneColor(mostReactionsPub.tone)}/20 rounded-full w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    {mostReactionsPub.tone}
                  </span>
                </div>

                <p className="text-sm text-neutral-600 mb-4 group-hover:text-neutral-800 transition-colors duration-200">
                  {mostReactionsPub.description?.slice(0, 150)}...
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-neutral-400">
                    <span className="flex items-center group-hover:text-red-500 transition-colors duration-200">
                      <Heart className="w-4 h-4 mr-1 text-red-500 group-hover:animate-heartbeat" />
                      {mostReactionsPub.reactions} réactions
                    </span>
                  </div>

                  <Link
                    to={`/publication/${mostReactionsPub.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center hover:bg-yellow-600 transition group-hover:pl-4 group-hover:pr-3 duration-200"
                  >
                    Lire <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Liste des autres publications */}
      <h2 className={`text-xl font-bold my-5 text-start flex items-center gap-3 ${darkMode ? 'text-white' : 'text-neutral-800'}`}>
        <Clock className="animate-spin-slow" /> Dernières publications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages
          .filter(page => !mostReactionsPub || page.id !== mostReactionsPub.id)
          .slice(0, 3)
          .map(page => (
            <div
              key={page.id}
              className={`rounded-xl overflow-hidden group transition border hover:shadow-md transform hover:-translate-y-1 duration-300 ${
                darkMode
                  ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-500'
                  : 'bg-white border-neutral-200 hover:border-neutral-400'
              } relative`}
            >
              <div className={`h-2 ${getToneColor(page.tone)} transition-all duration-300 group-hover:h-3`} />

              <div className="p-4">
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-bold group-hover:text-neutral-500 transition-colors duration-200">
                      {page.title}
                    </h3>
                    <div className="text-sm text-neutral-500">
                      par {page.author} • {page.timestamp}
                    </div>
                  </div>

                  <span className={`text-xl ${getToneColor(page.tone)}/20 rounded-full w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    {page.tone}
                  </span>
                </div>

                <p className="text-sm text-neutral-600 mb-4 group-hover:text-neutral-700 transition-colors duration-200">
                  {page.description?.slice(0, 100)}…
                </p>

                <div className="flex justify-between text-neutral-400">
                  <Link
                    to={`/publication/${page.id}`}
                    className="bg-neutral-500 text-white px-3 py-1 rounded-full flex items-center hover:bg-neutral-600 transition group-hover:pl-4 group-hover:pr-3 duration-200"
                  >
                    Lire <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* CSS pour les animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-heartbeat {
          animation: heartbeat 1s ease-in-out infinite;
        }
        .bubble {
          animation: float 6s ease-in-out infinite;
          opacity: 0.8;
        }
        .bubble:nth-child(1) { animation-delay: 0s; }
        .bubble:nth-child(2) { animation-delay: 1.5s; }
        .bubble:nth-child(3) { animation-delay: 3s; }
        .bubble:nth-child(4) { animation-delay: 4.5s; }
      `}</style>
    </section>
  );
}