// src/pages/UserTristesse.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import Publications from "../components/Publications.jsx";
import { User, LogOut, ChevronDown, MessageSquare } from "lucide-react";
import ChatPopup from "../components/ChatPopup.jsx";
import '../assets/chatBtn.css';

export default function UserTristesse() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 3000); // Ralenti pour un effet plus mélancolique
    return () => clearInterval(pulseInterval);
  }, []);

  const handleClick = () => {
    setShowChat(!showChat);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await api.post("accounts/logout/");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  const goToAddPublication = () => navigate("/add-publication");

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
      <nav className="bg-blue-50 border-b border-blue-100 shadow-sm mb-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  <img src="/logo.png" alt="" className="w-10 h-10" />
                </div>
                <span className="ml-3 font-medium text-blue-900 text-lg">
                  The.EndPage
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="bg-blue-100 flex items-center px-3 py-2 rounded-full text-blue-900 hover:bg-blue-200 transition-colors duration-300 focus:outline-none"
                  >
                    <User size={20} className="mr-2" />

                    <ChevronDown size={16} />
                  </button>
                </div>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-blue-100">
                    <div className="py-1">

                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 w-full"
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

      <div className="p-4 text-center space-y-6 mt-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-transparent bg-clip-text">
            🌧️ Un espace pour vos mots silencieux 🌧️
          </span>
        </h1>
        <p className="text-blue-800/80 mt-3 text-lg">
          Partagez ce qui pèse sur votre cœur dans un lieu d'écoute bienveillante
        </p>

        {/* Bouton chat mélancolique */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`absolute inset-0 rounded-full bg-blue-300 opacity-10 ${isPulsing ? 'animate-pulse-slow' : ''}`}></div>

          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative flex items-center justify-center 
              w-16 h-16 
              bg-gradient-to-br from-blue-400 to-blue-600
              rounded-full shadow-inner 
              transition-all duration-500 ease-in-out
              hover:shadow-blue-200/30
              group overflow-hidden
              z-5
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="relative flex items-center justify-center">
              {!isHovered ? (
                <MessageSquare size={24} className="text-white/90" />
              ) : (
                <div className="flex items-center text-white/90 font-medium">
                  <MessageSquare size={20} className="mr-2" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </span>
                </div>
              )}
            </div>
          </button>

          <div className="absolute inset-0 -m-1 rounded-full bg-blue-200/20 blur-sm group-hover:opacity-30 transition-opacity duration-500"></div>

          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-300/50 rounded-full animate-float-slow opacity-50"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400/40 rounded-full animate-float-medium opacity-60"></div>
        </div>

        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}

        {/* Section publications */}
        <div className="space-y-6">


          <div className="flex justify-between">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-800/90">
                🌫️ Mur des confidences
              </h2>
            </div>
            <button
              onClick={goToAddPublication}
              className={`
              flex items-center gap-2 px-5 py-3 rounded-xl
              bg-gradient-to-br from-blue-500/90 to-blue-600/90
              text-blue-50 font-medium
              shadow-inner
              transform transition-all duration-300
              hover:translate-y-[-1px]
              relative overflow-hidden
              group
              border border-blue-300/30
            `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">💧</span>
                <span>Écrire ce qui vous pèse</span>
              </span>

              <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>

              <span className="absolute bottom-2 left-1/2 w-16 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 transform -translate-x-1/2"></span>
            </button>
          </div>

          {publications.length > 0 ? (
            <Publications publications={publications} darkMode={false} />
          ) : (
            <div className="py-8 text-center text-blue-700/60 italic bg-white/30 rounded-xl border border-dashed border-blue-200">
              <p className="mb-2">Le silence règne pour l'instant...</p>
              <p>Soyez le premier à partager</p>
            </div>
          )}
        </div>
      </div>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.01); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        .animate-float-slow {
          animation: float-slow 4s infinite ease-in-out;
        }
        .animate-float-medium {
          animation: float-medium 3.5s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}