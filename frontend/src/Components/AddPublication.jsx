// src/Components/AddPublication.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function AddPublication({ authorId, onPublicationAdded }) {
  const navigate = useNavigate();

  // ----------------- états -----------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [music, setMusic] = useState(null);
  const [tone, setTone] = useState("😂");
  const [format, setFormat] = useState("classic");

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(65);

  // ----------------- CSRF + animation -----------------
  useEffect(() => {
    api.get("pages/csrf/").catch(() => {});
    const id = setInterval(() => setMood(Math.random() * 80 + 10), 5000);
    return () => clearInterval(id);
  }, []);

  // ----------------- submit -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    if (image) fd.append("image", image);
    if (video) fd.append("video", video);
    if (music) fd.append("music", music);
    fd.append("tone", tone);
    fd.append("format", format);
    if (authorId) fd.append("author_id", authorId);     // champ accepté par le serializer

    try {
      const { data } = await api.post("pages/publications/", fd, {
        withCredentials: true,
      });

      /* --- redirection --- */
      if (onPublicationAdded) {
        // L’appelant gère la navigation
        onPublicationAdded(data);           // on lui passe la pub si besoin
      } else {
        // Cas /add : on va vers la page publication
        navigate(`/publication/${data.id}`);
      }
    } catch (err) {
      console.error(err.response || err);
      alert("Erreur lors de l’ajout.");
      setLoading(false);
    }
  };

  // ----------------- étapes du wizard -----------------
  const steps = [
    /* 0 – titre */
    (
      <section className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">DONNEZ UN TITRE À VOTRE IRONIE</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Comment j'ai prétendu comprendre…"
          className="w-full p-4 my-6 bg-purple-50 rounded-xl text-xl text-center border-2 border-purple-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
        />
        <div className="w-full h-6 bg-gradient-to-r from-blue-500 via-green-400 to-red-500 rounded-full mx-auto relative my-8 overflow-hidden">
          <div 
            className="absolute w-8 h-10 bg-white rounded-md top-[-8px] shadow-lg border-2 border-purple-700 transition-all duration-500 ease-out"
            style={{ left: `${mood}%` }}
          />
        </div>
        <p className="text-lg font-medium text-purple-700">{Math.round(mood)} % de cynisme</p>
      </section>
    ),

    /* 1 – description */
    (
      <section className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">RÉVÉLEZ VOS PENSÉES</h2>
        <textarea
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-4 my-4 bg-purple-50 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
          placeholder="Aujourd'hui j'ai réalisé que…"
        />
      </section>
    ),

    /* 2 – médias */
    (
      <section className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: "🖼️", accept: "image/*", setter: setImage, label: "Image" },
            { icon: "🎬", accept: "video/*", setter: setVideo, label: "Vidéo" },
            { icon: "🎵", accept: "audio/*", setter: setMusic, label: "Musique" },
          ].map((o) => (
            <label 
              key={o.label} 
              className="flex-1 min-w-[250px] h-60 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="text-5xl mb-4">{o.icon}</span>
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-700 to-purple-500 text-white py-3 text-center font-medium transform translate-y-full group-hover:translate-y-0 transition-transform">
                {o.label}
              </span>
              <input
                type="file"
                accept={o.accept}
                onChange={(e) => o.setter(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </section>
    ),

    /* 3 – ton */
    (
      <section className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-8">CHOISIS TON EMOJI</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["😒", "🙌", "😂", "😢", "✨"].map((emo) => (
            <button
              key={emo}
              type="button"
              onClick={() => setTone(emo)}
              className={`w-16 h-16 rounded-full text-3xl flex items-center justify-center transition-all hover:scale-110 ${
                tone === emo ? "bg-white text-purple-800 shadow-lg" : "bg-purple-900 bg-opacity-50 hover:bg-opacity-70"
              }`}
            >
              {emo}
            </button>
          ))}
        </div>
      </section>
    ),

    /* 4 – format */
    (
      <section className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-8">SÉLECTIONNE LE FORMAT FINAL</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["classic", "fati", "canva", "immersive"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                format === f 
                  ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg" 
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>
    ),
  ];

  // ----------------- navigation -----------------
  const nav = (
    <div className="max-w-2xl mx-auto flex justify-between items-center p-4 bg-purple-700 rounded-xl text-white">
      <button
        type="button"
        disabled={step === 0}
        onClick={() => setStep((s) => s - 1)}
        className={`px-4 py-2 rounded-lg transition-all ${
          step === 0 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-purple-600 hover:shadow-md"
        }`}
      >
        ← Précédent
      </button>

      <span className="font-medium">
        Étape {step + 1}/{steps.length}
      </span>

      {step < steps.length - 1 ? (
        <button
          type="button"
          onClick={() => setStep((s) => s + 1)}
          className="px-4 py-2 rounded-lg bg-purple-800 hover:bg-purple-600 hover:shadow-md transition-all"
        >
          Suivant →
        </button>
      ) : (
        <button
          type="submit"
          disabled={loading || !title || !description}
          className={`px-4 py-2 rounded-lg transition-all ${
            loading || !title || !description
              ? "opacity-50 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:brightness-110"
          }`}
        >
          {loading ? "Publication…" : "Publier"}
        </button>
      )}
    </div>
  );

  // ----------------- rendu -----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-4xl mx-auto space-y-6"
      >
        {steps[step]}
        {nav}
      </form>
    </div>
  );
}
