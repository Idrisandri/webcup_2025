import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      // Redirection unique vers la page émotion
      navigate(`/user/${data.emotion}`);
    } catch (err) {
      console.error(err.response || err);
    }
  };

  return (

<div className="min-h-screen flex bg-gray-900">
<a 
    href="/" 
    className="absolute top-6 left-6 text-indigo-300 hover:text-white transition-colors duration-200"
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
  <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-900 to-purple-900 items-center justify-center p-12">
    <div className="text-center">
      <svg className="w-64 h-64 mx-auto text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
      </svg>
      <h2 className="text-3xl font-bold text-white mt-8 mb-2">Bienvenue</h2>
      <p className="text-indigo-200">Connectez-vous pour accéder à votre espace personnel</p>
    </div>
  </div>


  <div className="w-full md:w-1/2 flex items-center justify-center p-8">
    <form onSubmit={handleSubmit} className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="px-8 pt-8 pb-4">
        <h2 className="text-center text-2xl font-extrabold text-indigo-400 mb-1">
          Connexion
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Entrez vos identifiants pour accéder à votre compte
        </p>
      </div>
      <div className="px-8 pb-8">
        <div className="space-y-5">
          <div className="relative">
            <label className="text-sm font-medium text-gray-300 block mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={creds.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Votre adresse email"
              required
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-300 block mb-2">
              Mot de passe
            </label>
            <input
              name="password"
              type="password"
              value={creds.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Votre mot de passe"
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">
                Mot de passe oublié?
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition duration-300"
            >
              Se connecter
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Pas encore de compte?
              <a href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>

  );
}
