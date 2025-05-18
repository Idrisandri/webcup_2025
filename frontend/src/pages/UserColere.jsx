// src/pages/UserColere.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import Publications from "../components/Publications.jsx";
import { User, LogOut, ChevronDown, MessageSquare } from "lucide-react";
import ChatPopup from "../components/ChatPopup.jsx";
import { motion, AnimatePresence } from "framer-motion"; // <-- Ajouté ici
import "../assets/chatBtn.css";

export default function UserColere() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 2000);
    return () => clearInterval(pulseInterval);
  }, []);

  const handleClick = () => setShowChat(!showChat);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

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
      <nav className="bg-red-100 border-b border-red-200 shadow-md mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
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
                    className="bg-red-200 flex items-center px-3 py-2 rounded-full text-gray-800 hover:bg-red-300 transition-colors duration-200 focus:outline-none"
                  >
                    <User size={20} className="mr-2" />

                    <ChevronDown size={16} />
                  </button>
                </div>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-100 w-full"
                        >
                          <LogOut size={16} className="mr-2" />
                          Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-10 text-center space-y-6 mt-6">
        {/* Titre animé */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 text-transparent bg-clip-text">
            💢 Exprimez votre vérité sans filtre ! 💢
          </span>
        </motion.h1>

        {/* Sous-texte */}
        <motion.p
          className="text-gray-700 max-w-2xl mx-auto mt-3 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Un espace cathartique où chaque mot libère ce qui doit brûler
        </motion.p>

        {/* Bouton chat animé */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div
            className={`absolute inset-0 rounded-full bg-red-400 opacity-20 ${
              isPulsing ? "animate-ping" : ""
            }`}
          ></div>

          <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg transition-all duration-500 ease-in-out hover:shadow-red-300/50 hover:shadow-xl group overflow-hidden z-5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-size-200 animate-gradient-x"></div>

            <div className="relative flex items-center justify-center">
              {!isHovered ? (
                <MessageSquare size={24} className="text-white" />
              ) : (
                <div className="flex items-center text-white font-medium">
                  <MessageSquare size={20} className="mr-2" />
                </div>
              )}
            </div>
          </button>
        </motion.div>

        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatPopup onClose={() => setShowChat(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6 mt-12">
          {/* Titre et bouton */}
          <div className="flex justify-between md:flex-row flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl font-semibold flex items-center gap-2 text-red-800">
                💢 Derniers éclats
              </h2>
            </motion.div>

            {/* Bouton animé */}
            <motion.button
              onClick={goToAddPublication}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-400 to-orange-300 text-red-900 font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 relative overflow-hidden group border-2 border-red-300/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">💥</span>
                <span>Lâchez votre rage</span>
              </span>

              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </motion.button>
          </div>

          {/* Publications animées */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {publications.length > 0 ? (
              <Publications publications={publications} darkMode={false} />
            ) : (
              <motion.p
                className="text-red-700/80 text-center italic py-6 bg-white/50 rounded-xl border border-dashed border-red-200"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
              >
                Le calme avant la tempête... aucune publication pour le moment.
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
