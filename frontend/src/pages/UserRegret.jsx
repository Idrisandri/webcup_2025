import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api.js";
import Publications from "../components/Publications.jsx";
import { User, LogOut, ChevronDown, MessageSquare } from "lucide-react";
import ChatPopup from "../components/ChatPopup.jsx";
import "../assets/chatBtn.css";
import "../assets/regret.css";

export default function UserRegret() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 2500);
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
      <nav className="bg-teal-50/80 border-b border-teal-100 shadow-sm mb-20 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-600 to-slate-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  <img src="/logo.png" alt="" className="w-10 h-10" />
                </div>
                <span className="ml-3 font-medium text-teal-900/80 text-lg">
                  The.EndPage
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative ml-3">
                <button
                  onClick={toggleProfileMenu}
                  className="bg-teal-100/70 flex items-center px-3 py-2 rounded-full text-teal-900/80 hover:bg-teal-200/50 transition-colors duration-300 focus:outline-none border border-teal-200/50"
                >
                  <User size={20} className="mr-2" />
                  <ChevronDown size={16} />
                </button>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-teal-200/30">
                    <div className="py-1">
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

      <motion.div
        className="p-4 text-center space-y-6 mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-teal-700 via-slate-500 to-teal-400 text-transparent bg-clip-text">
            🍂 L'écho des mots non-dits 🍂
          </span>
        </motion.h1>
        <motion.p
          className="text-teal-800/70 mt-3 text-lg"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Un espace pour déposer ce que vous auriez aimé dire autrement
        </motion.p>
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/10 to-slate-500/10 ${
              isPulsing ? "animate-pulse-regret" : ""
            }`}
          ></div>
          <div className="absolute -top-3 -right-2 w-4 h-4 bg-teal-500/30 rounded-full animate-leaf-fall-1 opacity-70"></div>

          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-slate-500 rounded-full shadow-inner transition-all duration-500 ease-in-out hover:shadow-teal-300/30 group overflow-hidden border border-teal-300/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-slate-500/10 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative flex items-center justify-center">
              {!isHovered ? (
                <MessageSquare size={24} className="text-white/90 animate-float-regret" />
              ) : (
                <div className="flex items-center text-white/90 font-medium">
                  <MessageSquare size={20} className="mr-2" />
                </div>
              )}
            </div>
          </motion.button>

          <div className="absolute -bottom-2 -left-3 w-3 h-3 bg-slate-400/40 rounded-full animate-leaf-fall-2 opacity-60"></div>
        </div>

        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}

        <div className="space-y-6">
          <div className="flex justify-between  md:flex-row flex-col items-center gap-5 md:gap-0">
            <motion.h2
              className="text-2xl font-semibold flex items-center gap-2 text-teal-900/80"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              📜 Archives des remords
            </motion.h2>

            <motion.button
              onClick={goToAddPublication}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-teal-600/90 to-slate-500/90 text-teal-50 font-medium shadow-inner transform transition-all duration-300 relative overflow-hidden group border border-teal-300/30 z-5"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">✍️</span>
                <span>Exprimer un regret</span>
              </span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
              <span className="absolute bottom-2 left-1/2 w-16 h-0.5 bg-white/40 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 transform -translate-x-1/2"></span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {publications.length > 0 ? (
              <Publications publications={publications} darkMode={false} />
            ) : (
              <div className="py-8 text-center text-teal-700/60 italic bg-white/40 rounded-xl border border-dashed border-teal-300/50">
                <p className="mb-2">Les pages sont encore blanches...</p>
                <p>Vos regrets méritent d'être entendus</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
