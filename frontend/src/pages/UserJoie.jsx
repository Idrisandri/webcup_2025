// src/pages/UserJoie.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

import Publications from "../components/Publications.jsx";

import { Menu, User, LogOut, ChevronDown, MessageSquare, Trophy } from "lucide-react";
import ChatPopup from "../components/ChatPopup.jsx";
import '../assets/chatBtn.css';

export default function UserJoie() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 2000);

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

  const goToDisposition = () => navigate("/disposition");
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
      <nav className="bg-amber-100 border-b border-amber-200 shadow-md mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <img src="/logo.png" alt="" className="w-10 h-10" />
                </div>
                <span className="ml-3 font-medium text-gray-800 text-lg">
                  The.EndPage
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="bg-amber-200 flex items-center px-3 py-2 rounded-full text-gray-800 hover:bg-amber-300 transition-colors duration-200 focus:outline-none"
                  >
                    <User size={20} className="mr-2" />

                    <ChevronDown size={16} />
                  </button>
                </div>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">

                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 w-full"
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
        <h1 className="text-3xl md:text-4xl mb-2">
          <span className="bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-400 text-transparent bg-clip-text">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 text-transparent bg-clip-text">
                ✨ Bienvenue dans votre bulle de bonheur quotidien ! ✨
              </span>
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto mt-3 text-lg">
              Un espace lumineux où les sourires se partagent et les moments de
              joie s'amplifient
            </p>
          </span>
        </h1>

        <div className="fixed bottom-6 right-6 z-50">
          <div className={`absolute inset-0 rounded-full bg-amber-400 opacity-20 ${isPulsing ? 'animate-ping' : ''}`}></div>

          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative flex items-center justify-center 
              w-16 h-16 
              bg-gradient-to-r from-amber-400 to-yellow-500
              rounded-full shadow-lg 
              transition-all duration-500 ease-in-out
              hover:shadow-amber-300/50 hover:shadow-xl
              group overflow-hidden z-5
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-size-200 animate-gradient-x"></div>

            <div className="relative flex items-center justify-center">
              {!isHovered ? (
                <MessageSquare size={24} className="text-white animate-bounce" />
              ) : (
                <div className="flex items-center text-white font-medium">
                  <MessageSquare size={20} className="mr-2" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </span>
                </div>
              )}
            </div>
          </button>

          <div className="absolute inset-0 -m-1 rounded-full bg-amber-300 opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>

          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-float-slow opacity-70"></div>
          <div className="absolute -top-3 -left-2 w-2 h-2 bg-amber-400 rounded-full animate-float-medium opacity-60"></div>
          <div className="absolute -bottom-2 -right-3 w-4 h-4 bg-yellow-400 rounded-full animate-float-fast opacity-50"></div>
        </div>

        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}

        <div className="space-y-6">
          <div className="flex justify-center">
            
            
            <button
              onClick={goToAddPublication}
              className={`
              flex items-center gap-2 px-5 py-3 rounded-xl
              bg-gradient-to-r from-amber-400 to-yellow-300
              text-amber-900 font-medium
              shadow-lg hover:shadow-xl
              transform transition-all duration-300
              hover:translate-y-[-2px]
              relative overflow-hidden
              group
              border-2 border-amber-300/50
            `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">➕</span>
                <span>Ajouter une publication</span>
              </span>

              <span className="
              absolute inset-0 rounded-xl
              bg-gradient-to-r from-white/30 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            "></span>

              <span className="
              absolute top-1/4 left-2 w-1 h-1
              bg-white rounded-full
              opacity-70 group-hover:opacity-100
              transition-opacity duration-300
            "></span>
              <span className="
              absolute top-3/4 right-2 w-1.5 h-1.5
              bg-white rounded-full
              opacity-50 group-hover:opacity-90
              transition-opacity duration-500 delay-100
            "></span>
            </button>
          </div>

          {publications.length > 0 ? (
            <Publications publications={publications} darkMode={false} />
          ) : (
            <p className="text-neutral-500 text-center italic">
              Aucune publication pour le moment.
            </p>
          )}
        </div>
      </div>
    </>
  );
}