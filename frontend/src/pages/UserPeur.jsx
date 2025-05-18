// src/pages/UserPeur.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api.js";
import Publications from "../Components/Publications.jsx";
import { Menu, User, LogOut, ChevronDown, MessageSquare } from "lucide-react";
import '../assets/chatBtn.css'

export default function UserPeur() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 1500); // Animation plus rapide pour un effet inquiétant
    return () => clearInterval(pulseInterval);
  }, []);
  
  const navigate = useNavigate();
 const handleClick = () => {
    navigate("/chat");
  };
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const [publications, setPublications] = useState([]);

  const handleLogout = async () => {
    try {
      await api.post("accounts/logout/");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await api.get("pages/publications/");
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.results)
          ? res.data.results
          : [];
        setPublications(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des publications :", err);
      }
    };
    fetchPublications();
  }, []);

  return (
    <>
      {/* Navbar avec thème peur */}
      <nav className="bg-violet-900/5 border-b border-violet-900/10 shadow-lg mb-20 backdrop-blur-sm">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-700/30">
                  T
                </div>
                <span className="ml-3 font-medium text-violet-900 text-lg">
                  The.EndPage
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="bg-violet-900/10 flex items-center px-3 py-2 rounded-full text-violet-900 hover:bg-violet-900/20 transition-colors duration-200 focus:outline-none border border-violet-900/20"
                  >
                    <User size={20} className="mr-2" />
                    <span className="mr-1">Pierre</span>
                    <ChevronDown size={16} />
                  </button>
                </div>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-violet-50/95 backdrop-blur-sm ring-1 ring-violet-900/10">
                    <div className="py-1">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-violet-900 hover:bg-violet-100/50"
                      >
                        <User size={16} className="mr-2" />
                        Mon Profil
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-violet-900 hover:bg-violet-100/50 w-full"
                      >
                        <LogOut size={16} className="mr-2" />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="p-4 text-center space-y-6 mt-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-violet-300 text-transparent bg-clip-text">
            👁️‍🗨️ L'ombre qui écoute vos confessions 👁️‍🗨️
          </span>
        </h1>
        <p className="text-violet-800/80 mx-auto mt-3 text-lg">
          Exprimez ce qui vous hante dans ce sanctuaire discret
        </p>

        {/* Bouton chat avec animations intensifiées */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* Cercle pulsar énigmatique */}
          <div className={`
            absolute inset-0 rounded-full 
            bg-gradient-to-br from-violet-600/30 to-purple-800/40 
            ${isPulsing ? 'animate-pulse-fear' : ''}
            shadow-[0_0_15px_5px_rgba(124,58,237,0.3)]
          `}></div>
          
          {/* Effet de halo violet */}
          <div className={`
            absolute inset-0 rounded-full 
            bg-violet-500/10 
            group-hover:bg-violet-500/20 
            transition-all duration-1000
            ${isHovered ? 'animate-halo-fear' : ''}
          `}></div>
          
          {/* Bouton principal */}
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative flex items-center justify-center w-16 h-16 
              bg-gradient-to-br from-violet-700 to-purple-800
              rounded-full shadow-lg
              transition-all duration-500 ease-in-out
              hover:shadow-[0_0_20px_5px_rgba(139,92,246,0.4)]
              group overflow-hidden
              border border-violet-500/30
              transform ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          >
            {/* Animation de fond énigmatique */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 via-purple-700/30 to-violet-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-fear"></div>
            
            {/* Contenu du bouton */}
            <div className="relative flex items-center justify-center">
              {!isHovered ? (
                <MessageSquare size={24} className="text-white/90 animate-float-fear" />
              ) : (
                <div className="flex items-center text-white/90 font-medium">
                  <MessageSquare size={20} className="mr-2 animate-bounce-fear" />
                  
                </div>
              )}
            </div>
            
            {/* Effet "yeux" qui apparaissent */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
          </button>
          
          {/* Particules énigmatiques */}
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-violet-400/70 rounded-full animate-float-fear-1 opacity-70"></div>
          <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-purple-500/60 rounded-full animate-float-fear-2 opacity-60"></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white/50 rounded-full animate-float-fear-3 opacity-50"></div>
        </div>

        {/* Section publications */}
        <div className="space-y-6 mx-auto">
          <button className={`
            flex items-center gap-2 px-5 py-3 rounded-xl
            bg-gradient-to-br from-violet-700/90 to-purple-800/90
            text-violet-100 font-medium
            shadow-lg hover:shadow-xl
            transform transition-all duration-300
            hover:translate-y-[-2px]
            relative overflow-hidden
            group
            border border-violet-600/40
            hover:shadow-[0_5px_15px_-3px_rgba(124,58,237,0.3)]
          `}>
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl">👻</span>
              <span>Confier vos peurs</span>
            </span>
            
            {/* Effet de brume */}
            <span className="
              absolute inset-0 rounded-xl
              bg-gradient-to-b from-white/10 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            "></span>
            
            {/* Effet d'yeux qui apparaissent */}
            <span className="
              absolute top-3 left-4 w-1.5 h-1.5
              bg-white rounded-full
              opacity-0 group-hover:opacity-80
              transition-opacity duration-700
            "></span>
            <span className="
              absolute top-3 right-4 w-1.5 h-1.5
              bg-white rounded-full
              opacity-0 group-hover:opacity-80
              transition-opacity duration-700 delay-100
            "></span>
          </button>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-violet-900/90">
              🕸️ Mur des murmures
            </h2>
          </div>

          {publications.length > 0 ? (
            <Publications publications={publications} darkMode={false} />
          ) : (
            <div className="py-8 text-center text-violet-700/70 italic bg-white/20 rounded-xl border border-dashed border-violet-300/50">
              <p className="mb-2">Le silence règne dans l'obscurité...</p>
              <p>Osez briser le voile</p>
            </div>
          )}
        </div>
      </div>

      {/* Animations CSS custom */}
      <style jsx>{`
        @keyframes pulse-fear {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); box-shadow: 0 0 20px 8px rgba(124, 58, 237, 0.3); }
        }
        @keyframes halo-fear {
          0% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
          100% { opacity: 0.1; transform: scale(1); }
        }
        @keyframes float-fear {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes bounce-fear {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes float-fear-1 {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.7; }
          100% { transform: translate(-10px, -15px); opacity: 0; }
        }
        @keyframes float-fear-2 {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translate(15px, 10px); opacity: 0; }
        }
        @keyframes float-fear-3 {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translate(-5px, 20px); opacity: 0; }
        }
        .animate-pulse-fear {
          animation: pulse-fear 2s infinite ease-in-out;
        }
        .animate-halo-fear {
          animation: halo-fear 3s infinite ease-in-out;
        }
        .animate-float-fear {
          animation: float-fear 3s infinite ease-in-out;
        }
        .animate-bounce-fear {
          animation: bounce-fear 1.5s infinite ease-in-out;
        }
        .animate-float-fear-1 {
          animation: float-fear-1 6s infinite ease-in;
        }
        .animate-float-fear-2 {
          animation: float-fear-2 8s infinite ease-in;
        }
        .animate-float-fear-3 {
          animation: float-fear-3 7s infinite ease-in;
        }
        .animate-gradient-fear {
          background-size: 200% 200%;
          animation: gradient-fear 5s ease infinite;
        }
        @keyframes gradient-fear {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}