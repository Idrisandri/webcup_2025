// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import SignupStep2 from './components/SignupStep2.jsx';
import Login from './components/Login.jsx';
import UserJoie from './pages/UserJoie.jsx';
import UserColere from './pages/UserColere.jsx';
import UserRegret from './pages/UserRegret.jsx';
import UserTristesse from './pages/UserTristesse.jsx';
import UserPeur from './pages/UserPeur.jsx';
import ModeratorPage from './pages/ModeratorPage.jsx';

function Home() {
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

export default function App() {
  return (
    <Router>
      {/* Navigation */}
      <nav className="bg-gray-100 p-4">
        <ul className="flex space-x-4 max-w-4xl mx-auto">
          <li>
            <Link to="/" className="text-gray-800 hover:underline">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-step2" element={<SignupStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/joie" element={<UserJoie />} />
        <Route path="/user/colere" element={<UserColere />} />
        <Route path="/user/regret" element={<UserRegret />} />
        <Route path="/user/tristesse" element={<UserTristesse />} />
        <Route path="/user/peur" element={<UserPeur />} />
        <Route path="/moderator" element={<ModeratorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
