// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Signup from "./components/Signup.jsx";

import SignupStep2 from "./components/SignupStep2.jsx";
import PublicationPage from "./components/PublicationPage.jsx";
import Login from "./components/Login.jsx";
import Disposition from "./components/Disposition.jsx";   // D majuscule
import Chat from "./components/Chat.jsx";
import UserJoie from "./pages/UserJoie.jsx";
import UserColere from "./pages/UserColere.jsx";
import UserRegret from "./pages/UserRegret.jsx";
import UserTristesse from "./pages/UserTristesse.jsx";
import UserPeur from "./pages/UserPeur.jsx";

import AddPublication from "./components/AddPublication.jsx";


function Layout({ children }) {
  return (
    <main>{children}</main>
  );
}


export default function App() {
  const [user, setUser] = useState(null);

  // Qui suis-je ?
  useEffect(() => {
    axios
      .get("/api/accounts/me/")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Impossible de récupérer l’utilisateur", err);
        setUser({ id: null });
      });
  }, []);

  if (user === null) {
    return <div className="text-center py-10">Chargement…</div>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-step2" element={<SignupStep2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/disposition" element={<Disposition />} />

          {/* formulaire rapide */}
          <Route path="/add" element={<AddPublication authorId={user.id} />} />

          {/* page individuelle */}
          <Route path="/publication/:id" element={<PublicationPage />} />

          {/* dashboards par émotion */}
          <Route path="/user/joie" element={<UserJoie />} />
          <Route path="/user/colere" element={<UserColere />} />
          <Route path="/user/regret" element={<UserRegret />} />
          <Route path="/user/tristesse" element={<UserTristesse />} />
          <Route path="/user/peur" element={<UserPeur />} />

          {/* même composant, mais on redirige après le POST */}
          <Route
  path="/add-publication"
  element={
    <AddPublication
      authorId={user.id}
      onPublicationAdded={() => window.location.replace("/user/joie")}
    />
  }
/>


          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
