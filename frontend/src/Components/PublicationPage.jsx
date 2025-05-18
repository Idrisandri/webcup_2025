// src/pages/PublicationPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api.js";


import FatiLayout      from "../layouts/FatiLayout.jsx";
import CanvaLayout     from "../layouts/CanvaLayout.jsx";
import ImmersiveLayout from "../layouts/ImmersiveLayout.jsx";

export default function PublicationPage() {
  const { id } = useParams();
  const [pub, setPub] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    api
      .get(`pages/publications/${id}/`)
      .then(({ data }) => setPub(data))
      .catch((e) => setErr(e.response?.status || "Erreur"));
  }, [id]);

  /* ----------- affichage ----------- */
  if (err)
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-red-600">
          Impossible de charger la publication ({err})
        </p>
        <Link to="/add" className="text-blue-600 underline">
          Retour
        </Link>
      </div>
    );

  if (!pub) return <div className="p-8">Chargement…</div>;

  switch (pub.format) {
    case "fati":
      return <FatiLayout pub={pub} />;
    case "canva":
      return <CanvaLayout pub={pub} />;
    case "immersive":
      return <ImmersiveLayout pub={pub} />;
    default:
      return <ClassicLayout pub={pub} />;
  }
}
