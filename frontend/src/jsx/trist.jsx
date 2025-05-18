import React, { useEffect, useRef } from 'react';

// Composant pour les gouttes de pluie
const Raindrops = () => {
  const raindropsRef = useRef(null);
  
  useEffect(() => {
    const createRaindrop = () => {
      const drop = document.createElement('div');
      drop.className = 'absolute w-0.5 h-5 bg-gradient-to-b from-transparent to-light/30 opacity-0 animate-fall';
      
      // Position aléatoire
      const posX = Math.random() * window.innerWidth;
      drop.style.left = `${posX}px`;
      
      // Durée et délai aléatoires
      const duration = 1 + Math.random() * 2;
      const delay = Math.random() * 3;
      drop.style.animationDuration = `${duration}s`;
      drop.style.animationDelay = `${delay}s`;
      
      // Ajout au DOM
      if (raindropsRef.current) {
        raindropsRef.current.appendChild(drop);
      }
    };
    
    // Créer les gouttes de pluie
    const numberOfDrops = 50;
    for (let i = 0; i < numberOfDrops; i++) {
      createRaindrop();
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      if (raindropsRef.current) {
        raindropsRef.current.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div ref={raindropsRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"></div>
  );
};

// Composant pour la galerie d'images
const GalleryItem = ({ imageAlt, caption }) => {
  return (
    <div className="relative overflow-hidden rounded bg-medium shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <img 
        src="/api/placeholder/400/320" 
        alt={imageAlt} 
        className="w-full h-50 object-cover opacity-80 transition-opacity duration-300 filter grayscale-[40%] hover:opacity-100"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-dark/80 p-4 italic">
        {caption}
      </div>
    </div>
  );
};

// Composant pour les entrées de journal
const JournalEntry = ({ date, children }) => {
  return (
    <div className="mb-8">
      <div className="text-sm text-accent mb-2">{date}</div>
      <div className="font-['Verdana',sans-serif] leading-7">
        {children}
      </div>
    </div>
  );
};

// Composant principal
const EchosMelancoliques = () => {
  // Effet de défilement doux pour la navigation
  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-dark text-text font-['Georgia',serif] min-h-screen flex flex-col">
      {/* Styles globaux et animations */}
      <style jsx global>{`
        :root {
          --color-dark: #1a1a2e;
          --color-medium: #16213e;
          --color-accent: #4d4c7d;
          --color-light: #c2c2d6;
          --color-text: #e0e0e0;
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
      
      {/* Effet de pluie */}
      <Raindrops />
      
      {/* Header */}
      <header className="bg-medium p-6 text-center border-b border-accent">
        <h1 className="text-4xl m-0 tracking-wider font-normal text-light">Échos Mélancoliques</h1>
        <p className="italic mt-2 opacity-80">Un espace où mes sentiments prennent forme</p>
      </header>
      
      {/* Navigation */}
      <nav className="bg-medium p-2">
        <ul className="flex justify-center list-none m-0 p-0 md:flex-row flex-col items-center">
          <li className="mx-4 my-2 md:my-0">
            <a href="#accueil" 
               onClick={(e) => scrollToSection(e, '#accueil')}
               className="text-light no-underline font-['Verdana',sans-serif] text-sm tracking-wider transition-colors duration-300 hover:text-white">
              Accueil
            </a>
          </li>
          <li className="mx-4 my-2 md:my-0">
            <a href="#journal" 
               onClick={(e) => scrollToSection(e, '#journal')}
               className="text-light no-underline font-['Verdana',sans-serif] text-sm tracking-wider transition-colors duration-300 hover:text-white">
              Journal
            </a>
          </li>
          <li className="mx-4 my-2 md:my-0">
            <a href="#galerie" 
               onClick={(e) => scrollToSection(e, '#galerie')}
               className="text-light no-underline font-['Verdana',sans-serif] text-sm tracking-wider transition-colors duration-300 hover:text-white">
              Galerie
            </a>
          </li>
          <li className="mx-4 my-2 md:my-0">
            <a href="#videos" 
               onClick={(e) => scrollToSection(e, '#videos')}
               className="text-light no-underline font-['Verdana',sans-serif] text-sm tracking-wider transition-colors duration-300 hover:text-white">
              Vidéos
            </a>
          </li>
          <li className="mx-4 my-2 md:my-0">
            <a href="#propos" 
               onClick={(e) => scrollToSection(e, '#propos')}
               className="text-light no-underline font-['Verdana',sans-serif] text-sm tracking-wider transition-colors duration-300 hover:text-white">
              À propos
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Contenu principal */}
      <main className="flex-grow p-8 max-w-6xl mx-auto">
        {/* Introduction */}
        <section id="accueil" className="text-center mb-12 p-4 border-l-4 border-accent bg-accent/10">
          <p className="text-lg max-w-3xl mx-auto">
            Bienvenue dans mon monde intérieur, un espace où j'explore la mélancolie, la nostalgie et les émotions profondes qui façonnent mon existence. À travers images, mots et vidéos, je partage les fragments de mon âme.
          </p>
        </section>
        
        {/* Galerie */}
        <section id="galerie" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <GalleryItem 
            imageAlt="Reflets sous la pluie" 
            caption="Reflets sous la pluie - Les larmes du ciel reflètent mon état d'âme" 
          />
          <GalleryItem 
            imageAlt="Solitude urbaine" 
            caption="Solitude urbaine - Perdu dans la foule" 
          />
          <GalleryItem 
            imageAlt="Fenêtre embuée" 
            caption="Fenêtre embuée - La frontière floue entre moi et le monde" 
          />
          <GalleryItem 
            imageAlt="Vieux souvenirs" 
            caption="Vieux souvenirs - Pages jaunies d'un passé qui s'efface" 
          />
          <GalleryItem 
            imageAlt="Chemin brumeux" 
            caption="Chemin brumeux - L'incertitude qui m'accompagne" 
          />
          <GalleryItem 
            imageAlt="Piano abandonné" 
            caption="Piano abandonné - Les mélodies oubliées" 
          />
        </section>
        
        {/* Citation */}
        <div className="text-2xl italic text-center max-w-3xl mx-auto my-12 text-light leading-8 before:content-['"'] before:text-4xl before:text-accent before:leading-none before:align-middle before:-mt-4 before:mr-1 after:content-['"'] after:text-4xl after:text-accent after:leading-none after:align-middle after:-mt-4 after:ml-1">
          Parfois, les mots ne suffisent pas pour exprimer ce que l'âme ressent dans sa profondeur.
        </div>
        
        {/* Vidéo en vedette */}
        <section id="videos" className="my-12 text-center">
          <h2 className="text-xl mb-4">Moment Capturé</h2>
          <div className="relative w-full max-w-3xl mx-auto bg-medium p-4 rounded shadow-xl">
            <div className="w-full h-96 bg-[#0f0f1a] flex items-center justify-center rounded">
              <div className="w-20 h-20 rounded-full bg-accent/70 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-accent">
                <div className="w-0 h-0 border-solid border-t-transparent border-t-[15px] border-b-transparent border-b-[15px] border-l-[25px] border-l-light ml-1"></div>
              </div>
            </div>
            <p className="mt-4 italic opacity-80">Pluie d'automne - Un moment de contemplation filmé lors d'une journée pluvieuse d'octobre, quand le monde semble s'arrêter.</p>
          </div>
        </section>
        
        {/* Journal */}
        <section id="journal" className="bg-medium p-8 rounded mb-12">
          <h2 className="text-light border-b border-accent pb-2">Journal de Pensées</h2>
          
          <JournalEntry date="17 mai 2025">
            <p>Aujourd'hui, j'ai observé la pluie tomber pendant des heures. Chaque goutte semblait porter un fragment de mes pensées vers le sol. Je me demande où vont ces pensées une fois qu'elles touchent terre. Se dissolvent-elles comme les gouttes, ou bien s'infiltrent-elles quelque part, nourrissant quelque chose que je ne peux voir ?</p>
          </JournalEntry>
          
          <JournalEntry date="12 mai 2025">
            <p>Les souvenirs sont comme des ombres - plus présents quand la lumière baisse. Ce soir, dans la pénombre de ma chambre, ils dansaient sur les murs, me rappelant des visages que je tente d'oublier.</p>
            <p className="mt-2">J'ai essayé de les capturer en photo, mais les ombres ne se laissent pas emprisonner aussi facilement que la lumière.</p>
          </JournalEntry>
          
          <JournalEntry date="5 mai 2025">
            <p>J'ai retrouvé une vieille lettre aujourd'hui. Les mots écrits il y a des années résonnent encore, comme si le temps n'avait aucune emprise sur certaines émotions. Est-ce une malédiction ou un don que de ressentir aussi intensément ?</p>
          </JournalEntry>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-medium p-8 text-center mt-auto border-t border-accent">
        <div className="max-w-3xl mx-auto">
          <p>© 2025 Échos Mélancoliques - Un espace personnel</p>
          <p>Tous les sentiments partagés ici sont authentiques.</p>
        </div>
      </footer>
    </div>
  );
};

export default EchosMelancoliques;
