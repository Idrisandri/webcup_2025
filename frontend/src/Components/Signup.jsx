import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api.js';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    date_of_birth: '',
  });
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      date_of_birth: new Date(formData.date_of_birth).toISOString().slice(0, 10),
    };
    try {
      const { data } = await api.post('accounts/signup-step1/', payload);
      navigate('/signup-step2', { state: { userId: data.user_id } });
    } catch (err) {
      console.error('Erreur signup-step1 :', err.response?.data || err);
      alert(
        err.response?.data?.date_of_birth ??
        err.response?.data?.email ??
        err.response?.data?.username ??
        'Erreur inconnue. Vérifiez les champs.'
      );
    }
  };

  return (
    <motion.div
      className="min-h-screen flex bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-purple-900 items-center justify-center p-12"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <div className="text-center">
          <motion.img
            src="/logo.png"
            alt=""
            className="w-64 h-64 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
          />
          <h2 className="text-3xl font-bold text-white mt-8 mb-2">Rejoignez-nous</h2>
          <p className="text-purple-200">Créez votre compte pour commencer l'aventure</p>
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-gray-200 rounded-xl shadow-2xl overflow-hidden"
          whileHover={{ scale: 1.01 }}
        >
          <a
            href="/"
            className="absolute top-6 left-6 text-purple-300 hover:text-white transition-colors duration-200"
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

          <div className="px-8 pt-8 pb-4">
            <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-1">
              Inscription
            </h2>
            <p className="text-center text-sm text-gray-400 mb-6">
              Remplissez le formulaire pour créer votre compte
            </p>
          </div>

          <div className="px-8 pb-8 space-y-5">
            {[
              { label: "Nom d'utilisateur", name: 'username', type: 'text', placeholder: "Choisissez un nom d'utilisateur" },
              { label: 'Email', name: 'email', type: 'email', placeholder: "Votre adresse email" },
              { label: 'Mot de passe', name: 'password', type: 'password', placeholder: "Créez un mot de passe sécurisé" },
              { label: 'Date de naissance', name: 'date_of_birth', type: 'date' }
            ].map(({ label, name, type, placeholder }) => (
              <div className="relative" key={name}>
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  {label}
                </label>
                <motion.input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 border border-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  required
                />
              </div>
            ))}

            <div className="pt-2">
              <motion.button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-950 to-purple-900 text-white font-medium hover:from-purple-900 hover:to-purple-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Continuer
              </motion.button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Déjà un compte ?{' '}
                <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                  Se connecter
                </a>
              </p>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
