// src/pages/UserPeur.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import Publications from "../components/Publications.jsx";
import { User, LogOut, ChevronDown, MessageSquare } from "lucide-react";
import ChatPopup from "../components/ChatPopup.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function UserPeur() {
  const [isHovered, setIsHovered] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

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
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 40, transition: { duration: 0.3 } },
  };

  const bgVariants = {
    animate: {
      background: [
        "linear-gradient(135deg, #ede9fe 0%, #f3e8ff 100%)",
        "linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)",
        "linear-gradient(135deg, #ede9fe 0%, #f3e8ff 100%)",
      ],
      transition: { duration: 8, repeat: Infinity, repeatType: "loop" },
    },
  };

  return (
    <motion.div
      variants={bgVariants}
      animate="animate"
      className="min-h-screen"
    >
      <motion.nav
        className="bg-violet-900/5 border-b border-violet-900/10 shadow-lg mb-20 backdrop-blur-sm"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="h-14 w-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center shadow-lg"
                animate={{
                  boxShadow: [
                    "0 0 0px 0px #a78bfa",
                    "0 0 24px 6px #a78bfa, 0 0 12px 2px #f472b6",
                    "0 0 0px 0px #a78bfa",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <img src="/logo.png" alt="Logo" className="w-10 h-10" />
              </motion.div>
              <span className="ml-3 font-medium text-violet-900 text-lg">
                The.EndPage
              </span>
            </motion.div>
            <div className="flex items-center relative">
              <button
                onClick={toggleProfileMenu}
                className="bg-violet-900/10 flex items-center px-3 py-2 rounded-full text-violet-900 hover:bg-violet-900/20 transition-colors duration-200 border border-violet-900/20"
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
                    className="absolute right-0 mt-14 w-48 rounded-md shadow-lg bg-violet-50/95 backdrop-blur-sm ring-1 ring-violet-900/10 z-10"
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-violet-900 hover:bg-violet-100/50 w-full"
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
      </motion.nav>

      <motion.div
        className="p-4 text-center space-y-6 mt-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-violet-300 text-transparent bg-clip-text">
            👁️‍🗨️ L'ombre qui écoute vos confessions 👁️‍🗨️
          </span>
        </motion.h1>
        <motion.p
          className="text-violet-800/80 text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Exprimez ce qui vous hante dans ce sanctuaire discret
        </motion.p>
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 2 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            onClick={handleClick}
            className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-700 to-purple-800 rounded-full shadow-lg group overflow-hidden border border-violet-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/80 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? -2 : 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/80 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 2 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            <motion.div
              animate={{ y: isHovered ? -3 : 0 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
              className="text-white/90"
            >
              <MessageSquare size={24} />
            </motion.div>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 40 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-24 right-8 z-50"
            >
              <ChatPopup onClose={() => setShowChat(false)} />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="space-y-6 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="flex justify-between gap-5 md:gap-0 flex-col md:flex-row">
            <motion.h2
              className="text-2xl font-semibold text-violet-900/90 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              🕸️ Mur des murmures
            </motion.h2>
            <motion.button
              onClick={goToAddPublication}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-violet-700/90 to-purple-800/90 text-violet-100 font-medium shadow-lg hover:translate-y-[-2px] transition transform duration-300 relative overflow-hidden border border-violet-600/40"
              whileHover={{ scale: 1.06, boxShadow: "0 0 16px #a78bfa" }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-xl">👻</span>
                <span>Confier vos peurs</span>
              </span>
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {publications.length > 0 ? (
              <motion.div
                key="pubs"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
              >
                <Publications publications={publications} darkMode={false} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="py-8 text-center text-violet-700/70 italic bg-white/20 rounded-xl border border-dashed border-violet-300/50"
              >
                <p className="mb-2">Le silence règne dans l'obscurité...</p>
                <p>Osez briser le voile</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
