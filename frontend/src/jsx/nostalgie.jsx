import React from 'react';
import { Play } from 'lucide-react';

// Composant pour les polaroids
const Polaroid = ({ imageAlt, caption }) => {
  return (
    <div className="bg-white p-4 pb-12 shadow-md transform -rotate-2 mb-8 relative transition-all duration-300 hover:rotate-0 hover:scale-102 hover:shadow-lg">
      <div className="absolute top-0 left-5 w-10 h-8 bg-white/60 opacity-70 transform -rotate-45"></div>
      <div className="absolute top-0 right-5 w-10 h-8 bg-white/60 opacity-70 transform rotate-45"></div>
      <img 
        src="/api/placeholder/400/320" 
        alt={imageAlt} 
        className="w-full h-auto block filter sepia-[0.2]" 
      />
      <div className="absolute bottom-5 left-0 w-full text-center font-['Satisfy',cursive] text-lg text-[#5d4037]">
        {caption}
      </div>
    </div>
  );
};

// Composant pour les entrées de journal
const JournalEntry = ({ date, title, excerpt }) => {
  return (
    <div className="bg-white/85 p-6 rounded shadow relative">
      <div className="absolute -top-2 left-5 w-2/5 h-2 bg-[#c6b59c]"></div>
      <div className="font-serif text-[#8d6e63] mb-4 border-b border-dashed border-[#d7ccc8] pb-2">
        {date}
      </div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="mb-4">{excerpt}</p>
      <button className="inline-block bg-[#d7ccc8] text-[#5d4037] py-3 px-6 rounded-full font-mono text-base cursor-pointer transition-all duration-300 mt-5 shadow hover:bg-[#bcaaa4] hover:-translate-y-0.5 hover:shadow-md">
        Lire la suite
      </button>
    </div>
  );
};

// Composant principal
const NostalgicJournal = () => {
  return (
    <div className="font-mono bg-[#f5f2e9] text-[#333] leading-relaxed bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23d0c8b5\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')]">
      {/* Header */}
      <header className="text-center py-10 bg-white/70 border-b-3 border-[#d3b692] mb-8 shadow-md">
        <div className="w-[90%] max-w-6xl mx-auto px-5">
          <h1 className="text-5xl text-[#6d4c41] mb-2 font-serif shadow-sm">Fragments de Mémoire</h1>
          <p className="text-xl text-[#8d6e63]">Un voyage à travers mes souvenirs et sentiments</p>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="w-[90%] max-w-6xl mx-auto px-5">
        {/* Featured Section */}
        <div className="bg-gradient-to-r from-white/90 to-white/70 p-10 my-12 rounded-lg shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f6d365] to-[#fda085] opacity-[0.07] -z-10"></div>
          <h2 className="text-2xl mb-4">Mon Journal Nostalgique</h2>
          <p className="mb-4">Bienvenue dans mon espace personnel où je partage les moments qui ont façonné qui je suis. Chaque image, chaque vidéo raconte une histoire qui me tient à cœur.</p>
          <a href="#memories" className="inline-block bg-[#d7ccc8] text-[#5d4037] py-3 px-6 rounded-full font-mono text-base cursor-pointer transition-all duration-300 mt-5 shadow hover:bg-[#bcaaa4] hover:-translate-y-0.5 hover:shadow-md">
            Explorer mes souvenirs
          </a>
        </div>
        
        {/* Memory Grid Section */}
        <div id="memories" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Polaroid 
            imageAlt="Souvenir d'enfance - Plage" 
            caption="Été 1998, ma première journée à la mer" 
          />
          
          <JournalEntry 
            date="12 avril 2010" 
            title="Le parfum des souvenirs" 
            excerpt="Il y a des odeurs qui nous ramènent instantanément dans le passé. Pour moi, c'est l'odeur de la pluie sur l'asphalte chaud qui me rappelle nos promenades estivales après l'orage..." 
          />
          
          <Polaroid 
            imageAlt="Vieille photo - Amis" 
            caption="Les amis qui ont changé ma vie" 
          />
        </div>
        
        {/* Video Container */}
        <div className="relative pb-[56.25%] h-0 my-10 shadow-xl border-[15px] border-white">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10 flex items-center justify-center">
            <button className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
              <Play size={32} className="text-[#6d4c41] ml-1" />
            </button>
          </div>
        </div>
        
        {/* Music Box */}
        <div className="bg-[#f9f5ea] border border-[#e5ded1] p-5 rounded-lg my-8">
          <h3 className="font-serif text-[#6d4c41] mb-2 text-lg">La musique de ma vie</h3>
          <p className="mb-2">Ces mélodies qui m'ont accompagné à chaque étape importante...</p>
          <audio controls className="w-full mt-2">
            <source src="" type="audio/mpeg" />
            Votre navigateur ne supporte pas l'élément audio.
          </audio>
        </div>
        
        {/* Second Memory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <JournalEntry 
            date="7 septembre 2015" 
            title="Ce jour où tout a changé" 
            excerpt="Parfois, les tournants les plus importants de notre vie arrivent sans prévenir. Je me souviens encore de ce matin où j'ai pris cette décision qui allait tout changer..." 
          />
          
          <Polaroid 
            imageAlt="Paysage nostalgique" 
            caption="Le paysage qui m'inspire toujours" 
          />
          
          <JournalEntry 
            date="18 juin 2020" 
            title="Lettres jamais envoyées" 
            excerpt="Il y a des mots qu'on garde en soi, des lettres qu'on écrit mais qu'on n'envoie jamais. Voici quelques fragments de pensées que j'ai gardés pour moi pendant toutes ces années..." 
          />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-8 mt-12 border-t-2 border-dashed border-[#d7ccc8] text-[#8d6e63]">
        <div className="w-[90%] max-w-6xl mx-auto px-5">
          <p className="font-['Satisfy',cursive] text-xl mb-4">Les souvenirs sont les empreintes du cœur</p>
          <p>&copy; 2025 - Mon Journal Personnel</p>
        </div>
      </footer>
    </div>
  );
};

export default NostalgicJournal;
