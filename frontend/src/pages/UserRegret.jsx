// src/pages/UserRegret.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import Publications from "../Components/Publications.jsx";
import { Menu, User, LogOut, ChevronDown, MessageSquare } from "lucide-react";
import '../assets/chatBtn.css'

export default function UserRegret() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 2500); // Pulsation lente et irrégulière
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
      {/* Navbar avec thème regret */}
      <nav className="bg-teal-50/80 border-b border-teal-100 shadow-sm mb-20 backdrop-blur-sm">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-600 to-slate-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  T
                </div>
                <span className="ml-3 font-medium text-teal-900/80 text-lg">
                  The.EndPage
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="bg-teal-100/70 flex items-center px-3 py-2 rounded-full text-teal-900/80 hover:bg-teal-200/50 transition-colors duration-300 focus:outline-none border border-teal-200/50"
                  >
                    <User size={20} className="mr-2" />
                    <span className="mr-1">Pierre</span>
                    <ChevronDown size={16} />
                  </button>
                </div>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-teal-200/30">
                    <div className="py-1">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-teal-900/80 hover:bg-teal-100/50"
                      >
                        <User size={16} className="mr-2" />
                        Mon Profil
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-teal-900/80 hover:bg-teal-100/50 w-full"
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
          <span className="bg-gradient-to-r from-teal-700 via-slate-500 to-teal-400 text-transparent bg-clip-text">
            🍂 L'écho des mots non-dits 🍂
          </span>
        </h1>
        <p className="text-teal-800/70 mt-3 text-lg">
          Un espace pour déposer ce que vous auriez aimé dire autrement
        </p>

        {/* Bouton chat avec animation de feuilles tombantes */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* Cercle pulsar subtil */}
          <div className={`
            absolute inset-0 rounded-full 
            bg-gradient-to-br from-teal-500/10 to-slate-500/10 
            ${isPulsing ? 'animate-pulse-regret' : ''}
          `}></div>
          
          {/* Feuille animée 1 */}
          <div className="absolute -top-3 -right-2 w-4 h-4 bg-teal-500/30 rounded-full animate-leaf-fall-1 opacity-70"></div>
          
          {/* Bouton principal */}
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative flex items-center justify-center w-16 h-16 
              bg-gradient-to-br from-teal-600 to-slate-500
              rounded-full shadow-inner 
              transition-all duration-500 ease-in-out
              hover:shadow-teal-300/30
              group overflow-hidden
              border border-teal-300/30
            `}
          >
            {/* Animation de fond */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-slate-500/10 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {/* Contenu du bouton */}
            <div className="relative flex items-center justify-center">
              {!isHovered ? (
                <MessageSquare size={24} className="text-white/90 animate-float-regret" />
              ) : (
                <div className="flex items-center text-white/90 font-medium">
                  <MessageSquare size={20} className="mr-2" />
                  
                </div>
              )}
            </div>
          </button>
          
          {/* Feuille animée 2 */}
          <div className="absolute -bottom-2 -left-3 w-3 h-3 bg-slate-400/40 rounded-full animate-leaf-fall-2 opacity-60"></div>
        </div>

        {/* Section publications */}
        <div className="space-y-6">
          <button className={`
            flex items-center gap-2 px-5 py-3 rounded-xl
            bg-gradient-to-br from-teal-600/90 to-slate-500/90
            text-teal-50 font-medium
            shadow-inner
            transform transition-all duration-300
            hover:translate-y-[-1px]
            relative overflow-hidden
            group
            border border-teal-300/30
            z-5
          `}>
            
            {/* Effet de transparence */}
            <span className="
              absolute inset-0 rounded-xl
              bg-gradient-to-b from-white/10 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-700
            "></span>
            
            {/* Trait de soulignement discret */}
            <span className="
              absolute bottom-2 left-1/2 w-16 h-0.5
              bg-white/40 rounded-full
              opacity-0 group-hover:opacity-70
              transition-opacity duration-500
              transform -translate-x-1/2
            "></span>
          </button>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-teal-900/80">
              📜 Archives des remords
            </h2>
          </div>

          {publications.length > 0 ? (
            <Publications publications={publications} darkMode={false} />
          ) : (
            <div className="py-8 text-center text-teal-700/60 italic bg-white/40 rounded-xl border border-dashed border-teal-300/50">
              <p className="mb-2">Les pages sont encore blanches...</p>
              <p>Vos regrets méritent d'être entendus</p>
            </div>
          )}
        </div>
      </div>

      {/* Animations CSS custom */}
      <style jsx>{`
        @keyframes pulse-regret {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.02); }
        }
        @keyframes float-regret {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes leaf-fall-1 {
          0% { transform: translate(0, -10px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.7; }
          100% { transform: translate(15px, 30px) rotate(90deg); opacity: 0; }
        }
        @keyframes leaf-fall-2 {
          0% { transform: translate(0, -15px) rotate(30deg); opacity: 0; }
          30% { opacity: 0.6; }
          100% { transform: translate(-10px, 25px) rotate(120deg); opacity: 0; }
        }
        .animate-pulse-regret {
          animation: pulse-regret 4s infinite ease-in-out;
        }
        .animate-float-regret {
          animation: float-regret 4s infinite ease-in-out;
        }
        .animate-leaf-fall-1 {
          animation: leaf-fall-1 8s infinite ease-in;
        }
        .animate-leaf-fall-2 {
          animation: leaf-fall-2 10s infinite ease-in;
        }
      `}</style>
    </>
  );
}