// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur FinalBlast</h1>
      <p className="mb-6">Célébrez votre départ avec style et émotion.</p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/signup"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Inscription
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Connexion
        </Link>
      </div>
    </div>
  );
}
