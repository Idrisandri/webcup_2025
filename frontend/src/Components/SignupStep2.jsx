import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api.js';

export default function SignupStep2() {
  const { state } = useLocation(); // { userId }
  const navigate = useNavigate();
  const [emotion, setEmotion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emotions = [
    { value: 'joie', label: 'Joie', animation: { x: -100, opacity: 0 } },        // gauche
    { value: 'colere', label: 'Colère', animation: { y: -100, opacity: 0 } },    // haut
    { value: 'regret', label: 'Regret', animation: { x: 100, opacity: 0 } },     // droite
    { value: 'tristesse', label: 'Tristesse', animation: { y: 100, opacity: 0 } }, // bas
    { value: 'peur', label: 'Peur', animation: { scale: 0, opacity: 0 } },       // zoom
  ];

  const handleSubmit = async e => {
    e.preventDefault();

    if (!emotion) {
      alert('Veuillez sélectionner une émotion');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('accounts/signup-step2/', {
        user_id: state?.userId,
        emotion,
      });
      navigate('/login');
    } catch (err) {
      console.error('Erreur signup-step2 :', err.response?.data || err);
      alert(err.response?.data?.error || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto max-w-4xl">
      <div className="block font-bold mb-6 text-center text-3xl text-purple-800">
        Comment vous sentez-vous ?
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="overflow-hidden">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 w-max mx-auto p-4">
            {emotions.map((opt, index) => {
              let cellClasses = "";
              let cellSize = "min-w-[270px] min-h-[200px]";
              switch (index) {
                case 0: cellClasses = "col-span-2 row-span-2"; break;
                case 1: cellClasses = "row-span-3 col-start-3"; break;
                case 2: cellClasses = "row-span-3 row-start-3"; break;
                case 3: cellClasses = "row-span-3 row-start-3"; break;
                case 4: cellClasses = "row-span-2 col-start-3 row-start-4"; break;
                default: cellClasses = "col-span-1 row-span-1";
              }

              return (
                <motion.button
                  type="button"
                  key={opt.value}
                  onClick={() => setEmotion(opt.value)}
                  initial={opt.animation}
                  animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className={`${cellClasses} ${cellSize} border-2 border-purple-200 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-md ${
                    emotion === opt.value
                      ? 'bg-purple-700 text-white border-purple-700 shadow-lg'
                      : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                  }`}
                >
                  <span className="text-lg font-medium px-2 text-center">
                    {opt.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4 px-4">
        {emotions.map((opt, index) => (
          <motion.button
            type="button"
            key={opt.value}
            onClick={() => setEmotion(opt.value)}
            initial={opt.animation}
            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className={`w-full py-6 border-2 border-purple-200 rounded-lg flex items-center justify-center transition-all ${
              emotion === opt.value
                ? 'bg-purple-700 text-white border-purple-700 shadow-lg'
                : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
            }`}
          >
            <span className="text-lg font-medium">{opt.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Bouton finaliser */}
      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={isSubmitting || !emotion}
          className={`py-3 px-8 rounded-full text-white transition-colors duration-300 shadow-lg ${
            isSubmitting || !emotion
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-700 hover:bg-purple-800 hover:shadow-xl'
          } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
        >
          {isSubmitting ? 'Enregistrement...' : 'Terminer'}
        </button>
      </div>
    </form>
  );
}
