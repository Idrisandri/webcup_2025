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
      <section className="mood-container">
        <h2>DONNEZ UN TITRE À VOTRE IRONIE</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Comment j'ai prétendu comprendre…"
          className="w-full p-4 my-6 bg-gray-100 rounded text-xl text-center"
        />
        <div className="mood-meter">
          <div
            className="mood-indicator"
            style={{ left: `${mood}%` }}
          />
        </div>
        <p>{Math.round(mood)} % de cynisme</p>
      </section>
    ),

    /* 1 – description */
    (
      <section className="blog">
        <h2>RÉVÉLEZ VOS PENSÉES</h2>
        <textarea
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-4 my-4 bg-gray-100 rounded"
          placeholder="Aujourd’hui j’ai réalisé que…"
        />
      </section>
    ),

    /* 2 – médias */
    (
      <section className="gallery">
        {[
          { icon: "🖼️", accept: "image/*", setter: setImage, label: "Image" },
          { icon: "🎬", accept: "video/*", setter: setVideo, label: "Vidéo" },
          { icon: "🎵", accept: "audio/*", setter: setMusic, label: "Musique" },
        ].map((o) => (
          <label key={o.label} className="image-container">
            {o.icon}
            <span className="image-caption">{o.label}</span>
            <input
              type="file"
              accept={o.accept}
              onChange={(e) => o.setter(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        ))}
      </section>
    ),

    /* 3 – ton */
    (
      <section className="playlist">
        <h2>CHOISIS TON EMOJI</h2>
        <div className="flex flex-wrap justify-center gap-4 my-8">
          {["😒", "🙌", "😂", "😢", "✨"].map((emo) => (
            <button
              key={emo}
              type="button"
              onClick={() => setTone(emo)}
              className={`w-16 h-16 rounded-full text-3xl ${
                tone === emo ? "bg-white text-black" : "bg-gray-600"
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
      <section className="playlist">
        <h2>SÉLECTIONNE LE FORMAT FINAL</h2>
        <div className="flex flex-wrap justify-center gap-4 my-8">
          {["classic", "fati", "canva", "immersive"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              className={`px-4 py-2 border rounded ${
                format === f ? "bg-green-600 text-white" : "bg-white"
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
    <div className="flex justify-between p-4 bg-gray-900 text-white">
      <button
        type="button"
        disabled={step === 0}
        onClick={() => setStep((s) => s - 1)}
        className={`px-4 py-2 rounded ${
          step === 0 ? "opacity-50" : "hover:bg-gray-700"
        }`}
      >
        ← Précédent
      </button>

      <span>
        Étape {step + 1}/{steps.length}
      </span>

      {step < steps.length - 1 ? (
        <button
          type="button"
          onClick={() => setStep((s) => s + 1)}
          className="px-4 py-2 rounded hover:bg-gray-700"
        >
          Suivant →
        </button>
      ) : (
        <button
          type="submit"
          disabled={loading || !title || !description}
          className={`px-4 py-2 rounded ${
            loading || !title || !description
              ? "opacity-50"
              : "hover:bg-gray-700"
          }`}
        >
          {loading ? "Publication…" : "Publier"}
        </button>
      )}
    </div>
  );

  // ----------------- rendu -----------------
  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="bg-gray-100 min-h-screen font-mono"
    >
      {steps[step]}
      {nav}

      {/* styles “vite fait” */}
      <style>
        {`
        .mood-container{padding:80px 20px;text-align:center;background:#fff}
        .mood-meter{width:80%;max-width:600px;height:40px;background:linear-gradient(to right,blue,green,yellow,red);margin:20px auto;position:relative;border-radius:20px}
        .mood-indicator{width:30px;height:50px;background:#333;position:absolute;top:-5px;border-radius:5px;transition:left .5s}
        .gallery{display:flex;flex-wrap:wrap;padding:40px;background:#eee}
        .image-container{flex:1;min-width:300px;margin:10px;position:relative;height:200px;background:#ddd;display:flex;justify-content:center;align-items:center}
        .image-caption{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.7);color:#fff;padding:10px;text-align:center;transform:translateY(100%);transition:.3s}
        .image-container:hover .image-caption{transform:translateY(0)}
        .playlist{padding:60px 20px;background:#222;color:#fff;text-align:center}
        .blog{padding:60px 20px;background:#fff}
        `}
      </style>
    </form>
  );
}
