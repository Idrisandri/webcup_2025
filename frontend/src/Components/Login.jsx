import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api.js';

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('accounts/login/', creds);
      navigate(`/user/${data.emotion}`);
    } catch (err) {
      console.error(err.response || err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 relative overflow-hidden">

      {/* Bouton Retour */}
      <a
        href="/"
        className="absolute top-6 left-6 text-purple-300 hover:text-white transition-colors duration-200 z-10"
        aria-label="Retour à la page précédente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </a>

      {/* Partie gauche */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-purple-900 items-center justify-center p-12"
      >
        <div className="text-center">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            src="/logo.png"
            alt="Logo"
            className="w-64 h-64 mx-auto drop-shadow-xl"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-3xl font-bold text-white mt-8 mb-2"
          >
            Bienvenue
          </motion.h2>
          <p className="text-purple-200">Connectez-vous pour accéder à votre espace personnel</p>
        </div>
      </motion.div>

      {/* Formulaire */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full md:w-1/2 flex items-center justify-center p-8"
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-gray-200 rounded-xl shadow-2xl overflow-hidden border border-purple-300/30"
        >
          <div className="px-8 pt-8 pb-4">
            <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-1">
              Connexion
            </h2>
            <p className="text-center text-sm text-gray-400 mb-6">
              Entrez vos identifiants pour accéder à votre compte
            </p>
          </div>

          <div className="px-8 pb-8">
            <div className="space-y-6">
              {/* Email */}
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={creds.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-500/60 focus:border-transparent transition"
                  placeholder="Votre adresse email"
                  required
                />
              </motion.div>

              {/* Mot de passe */}
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Mot de passe
                </label>
                <input
                  name="password"
                  type="password"
                  value={creds.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-500/60 focus:border-transparent transition"
                  placeholder="Votre mot de passe"
                  required
                />
              </motion.div>

              {/* Bouton */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-800 via-purple-900 to-purple-950 text-white font-medium shadow-lg hover:from-purple-950 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                >
                  Se connecter
                </motion.button>
              </div>

              {/* Lien inscription */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  Pas encore de compte ?{' '}
                  <a
                    href="/signup"
                    className="text-purple-500 hover:text-purple-300 font-medium transition"
                  >
                    S'inscrire
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
