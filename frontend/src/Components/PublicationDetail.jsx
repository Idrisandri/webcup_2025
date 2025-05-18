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
    <div className=" bg-purple-500/10 text-[#333] leading-relaxed bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23d0c8b5\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')]">
  {/* Header */}
  <header className="text-center py-6 bg-white/70 border-b-3 border-purple-500/20 mb-6 shadow-md">
    
    <div className="w-[90%] max-w-4xl mx-auto px-5">
      <h1 className="text-3xl text-purple-900 mb-2 font-serif shadow-sm">Publication</h1>
      <p className="text-lg">Un moment partagé avec vous</p>
    </div>
  </header>
  
  {/* Main Content */}
  <div className="w-[90%] max-w-4xl mx-auto px-5">
    {/* Publication Card */}
    <div className="bg-white/70 p-8 rounded-lg shadow-lg relative mb-8">
      <div className="absolute -top-2 left-5 w-2/5 h-2 bg-purple-500/20"></div>
      
      <h1 className="text-2xl font-serif text-[#6d4c41] mb-3">{publication.title}</h1>
      <p className="text-sm text-[#8d6e63] mb-4 border-b border-dashed border-[#d7ccc8] pb-4">
        par {publication.author} • {publication.timestamp}
      </p>
      <p className="mb-6 text-[#5d4037]">{publication.description}</p>

      {/* Media Container */}
      <div className="mb-6">
        {publication.image && (
          <div className="bg-white p-4 pb-12 shadow-md transform -rotate-1 mb-4 relative">
            <div className="absolute top-0 left-5 w-10 h-8 bg-white/60 opacity-70 transform -rotate-45"></div>
            <div className="absolute top-0 right-5 w-10 h-8 bg-white/60 opacity-70 transform rotate-45"></div>
            <img 
              src={publication.image} 
              alt="" 
              className="w-full h-auto block filter sepia-[0.1]" 
            />
          </div>
        )}
        
        {publication.video && (
          <div className="relative pb-[56.25%] h-0 my-6 shadow-xl border-[10px] border-white">
            <video 
              controls 
              src={publication.video} 
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        )}
        
        {publication.music && (
          <div className="bg-purple-300/10 border border-[#e5ded1] p-5 rounded-lg my-6">
            <h3 className="font-serif text-purple-900 mb-2 text-lg">Extrait audio</h3>
            <audio controls src={publication.music} className="w-full mt-2">
              Votre navigateur ne supporte pas l'élément audio.
            </audio>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex space-x-6 text-sm text-[#8d6e63] mb-6 border-t border-dashed border-[#d7ccc8] pt-4">
        <span>👁️ {publication.views} vues</span>
        <span>❤️ {publication.reactions} réactions</span>
        <span>📤 {publication.shares} partages</span>
      </div>

      {/* Buttons - Functionality remains exactly the same */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={addOrRemoveReaction}
          className={`bg-purple-200/50 text-[#5d4037] py-2 px-6 rounded-full  text-base cursor-pointer transition-all duration-300 shadow hover:bg-purple-400/50 hover:-translate-y-0.5 hover:shadow-md ${reacted ? 'opacity-70' : ''}`}
        >
          {reacted ? '❤️ Réaction annulée' : '❤️ Réagir'}
        </button>

        <button
          onClick={() => {
            alert("Partage effectué !");
            api.patch(`pages/publications/${id}/`, {
              shares: (publication.shares || 0) + 1
            }).then(res => {
              setPublication(res.data);
            }).catch(err => console.error("Erreur partage:", err));
          }}
          className="bg-purple-200/50 text-[#5d4037] py-2 px-6 rounded-full  text-base cursor-pointer transition-all duration-300 shadow hover:bg-purple-400/50 hover:-translate-y-0.5 hover:shadow-md"
        >
          Partager 📤
        </button>
      </div>
    </div>
  </div>
  
  {/* Footer */}
  <footer className="text-center py-6 mt-8 border-t-2 border-dashed border-purple-500/20 ">
    <div className="w-[90%] max-w-4xl mx-auto px-5  font-extralight">
      <p className="text-lg mb-2">Merci d'avoir pris le temps de lire</p>
      <p className="text-sm">© {new Date().getFullYear()} - Tous droits réservés</p>
    </div>
  </footer>
</div>
  );
}
