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
  <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-900 to-purple-900 items-center justify-center p-12">
    <div className="text-center">
      <img src="/logo.png" alt="" className='w-64 h-64 mx-auto'/>
      <h2 className="text-3xl font-bold text-white mt-8 mb-2">Bienvenue</h2>
      <p className="text-purple-200">Connectez-vous pour accéder à votre espace personnel</p>
    </div>
  </div>


  <div className="w-full md:w-1/2 flex items-center justify-center p-8">
    <form onSubmit={handleSubmit} className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="px-8 pt-8 pb-4">
        <h2 className="text-center text-2xl font-extrabold text-purple-700 mb-1">
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
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Votre mot de passe"
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-purple-400 hover:text-purple-300">
                Mot de passe oublié?
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-900 to-purple-950 text-white font-medium hover:from-purple-950 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 transition duration-300"
            >
              Se connecter
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Pas encore de compte?
              <a href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
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
