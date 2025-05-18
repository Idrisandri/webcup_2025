import { useState, useEffect } from 'react';

export default function IronicUniverse() {
  const [moodPosition, setMoodPosition] = useState(65);

  useEffect(() => {
    // Change mood indicator position randomly every 5 seconds
    const interval = setInterval(() => {
      const newPosition = Math.random() * 80 + 10;
      setMoodPosition(newPosition);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-mono m-0 p-0 bg-gray-100 text-gray-800 transition-all duration-500">
      {/* Header Section */}
      <header id="accueil" className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-700 to-gray-900 text-white relative overflow-hidden">
        <h1 className="text-6xl md:text-7xl m-0 uppercase tracking-widest">
          Mon univers
          <span className="inline-block w-2.5 h-em bg-white animate-blink ml-1"></span>
        </h1>
        <p className="italic mt-5 opacity-70">Bienvenue dans mon monde... ou pas</p>
        <div className="absolute bottom-8 text-2xl">↓ Découvrez l'ironie ↓</div>
      </header>

      {/* Mood Section */}
      <section id="humeur" className="py-20 px-5 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4">HUMEUR DU JOUR</h2>
        <p className="mb-6">Un graphique ridiculement précis de comment je me sens</p>
        <div className="w-4/5 max-w-xl h-10 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-400 to-red-500 mx-auto relative rounded-full">
          <div 
            className="w-8 h-12 bg-gray-800 absolute -top-1 rounded transition-all duration-500"
            style={{ left: `${moodPosition}%` }}
          ></div>
        </div>
        <p className="mt-4">65% de cynisme avec une touche d'espoir inexplicable</p>
      </section>

      {/* Gallery/Contradictions Section */}
      <section id="contradictions" className="flex flex-wrap p-10 bg-gray-200">
        <h2 className="w-full text-center text-3xl font-bold mb-8">MES CONTRADICTIONS</h2>
        
        <div className="flex-1 min-w-[300px] m-2.5 relative overflow-hidden h-52 bg-gray-300 flex justify-center items-center group">
          <div className="text-6xl">🌧️</div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2.5 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            "J'adore la pluie" (sauf quand je suis dehors)
          </div>
        </div>
        
        <div className="flex-1 min-w-[300px] m-2.5 relative overflow-hidden h-52 bg-gray-300 flex justify-center items-center group">
          <div className="text-6xl">📱</div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2.5 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            "Je déteste la technologie" (posté depuis mon smartphone)
          </div>
        </div>
        
        <div className="flex-1 min-w-[300px] m-2.5 relative overflow-hidden h-52 bg-gray-300 flex justify-center items-center group">
          <div className="text-6xl">🎭</div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2.5 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            "Totalement authentique" (la plupart du temps)
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="musique" className="py-16 px-5 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">BANDE-SON DE MES PENSÉES</h2>
        <p className="mb-8">La musique que j'écoute vs ce que je ressens vraiment</p>
        
        <div className="w-4/5 max-w-lg mx-auto bg-gray-700 p-5 rounded-lg">
          <div>En cours de lecture: "Tout va bien" par Les Menteurs Professionnels</div>
          <div className="h-1.5 bg-gray-600 my-2.5">
            <div className="h-full w-3/5 bg-white"></div>
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex justify-center items-center cursor-pointer hover:bg-gray-500">◀◀</div>
            <div className="w-12 h-12 rounded-full bg-gray-600 flex justify-center items-center cursor-pointer hover:bg-gray-500">▶</div>
            <div className="w-12 h-12 rounded-full bg-gray-600 flex justify-center items-center cursor-pointer hover:bg-gray-500">▶▶</div>
          </div>
        </div>
        
        <p className="mt-6">Prochainement: "La réalité derrière mon sourire" et "Sarcasme en si mineur"</p>
      </section>

      {/* Blog Section */}
      <section id="pensees" className="py-16 px-5 bg-white">
        <h2 className="text-center text-3xl font-bold mb-8">IRONIE SINCÈRE - MON BLOG</h2>
        
        <div className="max-w-2xl mx-auto mb-10 p-5 bg-gray-100 border-l-4 border-gray-700">
          <h3 className="text-xl font-bold mb-2">Comment j'ai décidé d'être moi-même (après avoir essayé d'être tout le monde)</h3>
          <p className="text-gray-600 mb-3">Publié le: 15 mai 2025 | Catégorie: Révélations ironiques</p>
          <p className="mb-3">Je me suis réveillé ce matin avec une révélation profonde: être authentique est tellement plus facile quand personne ne regarde. C'est fascinant comme je peux jongler entre "moi en public" et "moi véritable" avec une aisance qui mériterait un Oscar...</p>
          <p><a href="#" className="text-blue-600 hover:underline">Lire la suite →</a></p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-10 p-5 bg-gray-100 border-l-4 border-gray-700">
          <h3 className="text-xl font-bold mb-2">Lettre ouverte à mes attentes irréalistes</h3>
          <p className="text-gray-600 mb-3">Publié le: 10 mai 2025 | Catégorie: Correspondances intérieures</p>
          <p className="mb-3">Chères attentes impossibles à satisfaire, merci de votre présence constante dans ma vie. J'apprécie particulièrement comment vous vous élevez à chaque fois que j'atteins presque mes objectifs...</p>
          <p><a href="#" className="text-blue-600 hover:underline">Lire la suite →</a></p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-5 px-4">
        <p>© 2025 MON UNIVERS IRONIQUE</p>
        <p>Site conçu avec 50% d'ironie, 30% de sincérité et 20% de café</p>
      </footer>

      {/* Custom animation for the blinking cursor */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}
