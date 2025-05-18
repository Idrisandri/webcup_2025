// src/pages/UserJoie.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api.js";

import Publications from "../components/Publications.jsx";
import ChatPopup from "../components/ChatPopup.jsx";

import {
  Menu,
  User,
  LogOut,
  ChevronDown,
  MessageSquare,
  Trophy,
} from "lucide-react";

import "../assets/chatBtn.css";

export default function UserJoie() {
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
      {/* Barre de navigation */}
      <motion.nav
        className="bg-amber-00 border-b border-amber-200 shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <motion.div
                  className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src="/logo.png" alt="" className="w-10 h-10" />
                </motion.div>
                <span className="ml-3 font-medium text-gray-800 text-lg">
                  The.EndPage
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative ml-3">
                <button
                  onClick={toggleProfileMenu}
                  className="bg-amber-200 flex items-center px-3 py-2 rounded-full text-gray-800 hover:bg-amber-300 transition-colors duration-200"
                >
                  <User size={20} className="mr-2" />
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 w-full"
                      >
                        <LogOut size={16} className="mr-2" />
                        Déconnexion
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="p-4 text-center pt-26 mx-10 bg-stone-100 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 text-transparent bg-clip-text">
            ✨ Bienvenue dans votre bulle de bonheur quotidien ! ✨
          </span>
        </motion.h1>
        <motion.p
          className="text-gray-700 max-w-2xl mx-auto mt-3 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Un espace lumineux où les sourires se partagent et les moments de joie
          s'amplifient
        </motion.p>

        {/* Bouton de chat */}
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`absolute inset-0 rounded-full bg-amber-400 opacity-20 ${
              isPulsing ? "animate-ping" : ""
            }`}
          ></div>
          <motion.button
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
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-size-200 animate-gradient-x"></div>
            <div className="relative flex items-center justify-center">
              <MessageSquare
                size={24}
                className={`text-white ${
                  !isHovered ? "animate-bounce" : ""
                }`}
              />
            </div>
          </motion.button>

          <div className="absolute inset-0 -m-1 rounded-full bg-amber-300 opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>

          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-float-slow opacity-70"></div>
          <div className="absolute -top-3 -left-2 w-2 h-2 bg-amber-400 rounded-full animate-float-medium opacity-60"></div>
          <div className="absolute -bottom-2 -right-3 w-4 h-4 bg-yellow-400 rounded-full animate-float-fast opacity-50"></div>
        </div>

        {showChat && <ChatPopup onClose={() => setShowChat(false)} />}

        {/* Bouton ajouter publication */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl">➕</span>
              <span>Ajouter une publication</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Publications */}
        <motion.div
          className="mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.6 } },
          }}
        >
          {publications.length > 0 ? (
            <Publications publications={publications} darkMode={false} />
          ) : (
            <motion.p
              className="text-neutral-500 text-center italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Aucune publication pour le moment.
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
