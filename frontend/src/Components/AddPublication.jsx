// src/Components/AddPublication.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { motion, AnimatePresence } from "framer-motion";

export default function AddPublication({ authorId, onPublicationAdded }) {
  const navigate = useNavigate();

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

  useEffect(() => {
    api.get("pages/csrf/").catch(() => {});
    const id = setInterval(() => setMood(Math.random() * 80 + 10), 5000);
    return () => clearInterval(id);
  }, []);

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
    if (authorId) fd.append("author_id", authorId);

    try {
      const { data } = await api.post("pages/publications/", fd, {
        withCredentials: true,
      });

      if (onPublicationAdded) {
        onPublicationAdded(data);
      } else {
        navigate(`/publication/${data.id}`);
      }
    } catch (err) {
      console.error(err.response || err);
      alert("Erreur lors de l’ajout.");
      setLoading(false);
    }
  };

  const containerAnim = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  const steps = [
    /* 0 – titre */
    <motion.section {...containerAnim} key="step-title" className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">DONNEZ UN TITRE À VOTRE IRONIE</h2>
      <motion.input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Comment j'ai prétendu comprendre…"
        className="w-full p-4 focus:border-1 my-6 bg-purple-50 rounded-xl text-xl text-center border-2 border-purple-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
        {...pulseAnimation}
      />
      <div className="w-full h-6 bg-gradient-to-r from-blue-500 via-green-400 to-red-500 rounded-full mx-auto relative my-8 overflow-hidden">
        <motion.div
          className="absolute w-8 h-10 bg-white rounded-md top-[-8px] shadow-lg border-2 border-purple-700"
          animate={{ left: `${mood}%` }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        />
      </div>
      <p className="text-lg font-medium text-purple-700">{Math.round(mood)} % de cynisme</p>
    </motion.section>,

    /* 1 – description */
    <motion.section {...containerAnim} key="step-desc" className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">RÉVÉLEZ VOS PENSÉES</h2>
      <motion.textarea
        rows="6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-4 border-2 border-purple-500 my-4 bg-purple-50 rounded-xl focus:border-0 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
        {...pulseAnimation}
      />
    </motion.section>,

    /* 2 – médias */
    <motion.section {...containerAnim} key="step-media" className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { icon: "🖼️", accept: "image/*", setter: setImage, label: "Image" },
          { icon: "🎬", accept: "video/*", setter: setVideo, label: "Vidéo" },
          { icon: "🎵", accept: "audio/*", setter: setMusic, label: "Musique" },
        ].map((o) => (
          <motion.label
            key={o.label}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 min-w-[250px] h-60 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-purple-500 transition-all"
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
          </motion.label>
        ))}
      </div>
    </motion.section>,

    /* 3 – ton */
    <motion.section {...containerAnim} key="step-tone" className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">CHOISIS TON EMOJI</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {["😒", "🙌", "😂", "😢", "✨"].map((emo) => (
          <motion.button
            key={emo}
            type="button"
            onClick={() => setTone(emo)}
            whileHover={{ scale: 1.2 }}
            className={`w-16 h-16 rounded-full text-3xl flex items-center justify-center transition-all ${
              tone === emo ? "bg-white text-purple-800 shadow-lg" : "bg-purple-900 bg-opacity-50"
            }`}
          >
            {emo}
          </motion.button>
        ))}
      </div>
    </motion.section>,

    /* 4 – format */
    <motion.section {...containerAnim} key="step-format" className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-8">SÉLECTIONNE LE FORMAT FINAL</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {["classic", "fati", "canva", "immersive"].map((f) => (
          <motion.button
            key={f}
            type="button"
            onClick={() => setFormat(f)}
            whileHover={{ scale: 1.1 }}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              format === f
                ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>
    </motion.section>,
  ];

  const nav = (
    <motion.div
      key="nav"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-2xl mx-auto flex justify-between items-center p-4 bg-purple-700 rounded-xl text-white"
    >
      <button
        type="button"
        disabled={step === 0}
        onClick={() => setStep((s) => s - 1)}
        className={`px-4 py-2 rounded-lg transition-all ${
          step === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600 hover:shadow-md"
        }`}
      >
        ← Précédent
      </button>

      <span className="font-medium">Étape {step + 1}/{steps.length}</span>

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
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-4xl mx-auto space-y-6"
      >
        <AnimatePresence mode="wait">
          {steps[step]}
        </AnimatePresence>
        {nav}
      </form>
    </div>
  );
}
