// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from 'react-router-dom';

import Home from './pages/Home.jsx';
import Signup from './components/Signup.jsx';
import SignupStep2 from './components/SignupStep2.jsx';
import Login from './components/Login.jsx';
import UserJoie from './pages/UserJoie.jsx';
import UserColere from './pages/UserColere.jsx';
import UserRegret from './pages/UserRegret.jsx';
import UserTristesse from './pages/UserTristesse.jsx';
import UserPeur from './pages/UserPeur.jsx';
import ModeratorPage from './pages/ModeratorPage.jsx';

function Layout({ children }) {
  const { pathname } = useLocation();

  // Affiche la nav uniquement sur la home page "/"
  const showNav = pathname === '/';

  return (
    <>
      {showNav && (
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
      )}
      <main>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  );
}
