import { useState, useEffect } from "react";
import { ChevronDown, Play, Pause, SkipBack, SkipForward, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function EmotionalUniverse() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="bg-[#1a1a2e] text-gray-200 font-['Montserrat',sans-serif] min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${isScrolled ? 'py-4 shadow-lg' : 'py-5'} bg-opacity-90 bg-[#1a1a2e] backdrop-blur-md`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#accueil" onClick={(e) => { e.preventDefault(); scrollToSection('accueil'); }} 
             className="text-2xl font-bold text-white no-underline">
            Mon<span className="text-purple-500">Âme</span>
          </a>
          
          <ul className="hidden md:flex space-x-8">
            {['accueil', 'apropos', 'emotions', 'musique', 'journal', 'contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                  className="text-gray-200 no-underline transition-colors hover:text-purple-500 font-medium"
                >
                  {item === 'accueil' ? 'Accueil' : 
                   item === 'apropos' ? 'À propos' : 
                   item === 'emotions' ? 'Émotions' : 
                   item === 'musique' ? 'Musique' : 
                   item === 'journal' ? 'Journal' : 'Contact'}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile menu button could go here */}
        </div>
      </nav>

      {/* Header / Accueil */}
      <header id="accueil" className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-cover bg-center bg-no-repeat" 
              style={{ 
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/api/placeholder/1200/800')" 
              }}>
        <div className="absolute w-full h-full rounded-full bg-purple-600 bg-opacity-30 animate-pulse scale-100 opacity-50"></div>
        
        <h1 className="text-5xl md:text-6xl mb-5 text-shadow z-10 px-4">
          Mon Univers Émotionnel
        </h1>
        <p className="text-xl max-w-xl mb-8 z-10 px-6">
          Un voyage à travers mes pensées, mes sentiments et les moments qui ont façonné mon être
        </p>
        
        <a href="#apropos" 
           onClick={(e) => { e.preventDefault(); scrollToSection('apropos'); }}
           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white no-underline transition-all hover:-translate-y-1"
        >
          <span className="mb-2 text-sm">Découvrir</span>
          <div className="w-8 h-12 border-2 border-white rounded-3xl relative">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </a>
      </header>

      {/* À propos */}
      <section id="apropos" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl mb-16 text-center text-purple-500">À propos de moi</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <p className="mb-4">
                Je suis un esprit curieux et sensible, cherchant à comprendre les émotions qui nous animent et à les partager à travers différentes formes d'expression. Ce site est un reflet de mon monde intérieur, un espace où mes sentiments prennent vie.
              </p>
              <p className="italic my-8 pl-5 border-l-4 border-purple-500 text-gray-400">
                "Les émotions sont les couleurs avec lesquelles je peins ma réalité, chaque teinte raconte une histoire unique et personnelle."
              </p>
              <p>
                Mon parcours est marqué par des hauts et des bas, des moments de joie intense et de profonde mélancolie. À travers ce site, je souhaite vous inviter à explorer mon univers, à ressentir ce que je ressens et à comprendre ce qui me fait vibrer.
              </p>
            </div>
            
            <div className="flex-1 relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/api/placeholder/600/400" 
                alt="Portrait reflétant mon univers émotionnel" 
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Galerie d'émotions */}
      <section id="emotions" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl mb-12 text-center text-purple-500">Mes Émotions en Images</h2>
          <p className="text-center mb-12">
            Chaque image capture un instant, une émotion, un fragment de mon âme.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Sérénité", desc: "La tranquillité d'un moment de paix intérieure" },
              { title: "Euphorie", desc: "L'explosion de joie qui illumine tout mon être" },
              { title: "Mélancolie", desc: "La douce tristesse qui m'envahit parfois" },
              { title: "Nostalgie", desc: "Le souvenir des moments précieux du passé" },
              { title: "Contemplation", desc: "L'immersion dans mes pensées les plus profondes" },
              { title: "Passion", desc: "L'intensité qui me consume et me fait avancer" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-lg h-72 cursor-pointer transform transition-transform duration-500 hover:-translate-y-2 group"
              >
                <img 
                  src={`/api/placeholder/400/300`} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-xl text-white">{item.title}</h3>
                  <p className="text-white/80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Musique */}
      <section id="musique" className="py-32 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl mb-16 text-center text-purple-500">Ma Playlist Émotionnelle</h2>
          
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 rounded-xl p-8 shadow-2xl">
              <div className="mb-5">
                <h3 className="text-2xl text-white">Mélancolie en Sol Mineur</h3>
                <p className="text-gray-400 mt-1">Les Échos de l'Âme</p>
              </div>
              
              <div className="bg-white/20 rounded h-1.5 w-full cursor-pointer mb-5">
                <div className="bg-purple-500 rounded h-full w-1/3"></div>
              </div>
              
              <div className="flex justify-center items-center space-x-4">
                <button className="w-12 h-12 rounded-full bg-purple-500 text-white flex justify-center items-center transition hover:bg-purple-600 hover:scale-110">
                  <SkipBack size={20} />
                </button>
                <button 
                  className="w-16 h-16 rounded-full bg-purple-500 text-white flex justify-center items-center transition hover:bg-purple-600 hover:scale-110"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button className="w-12 h-12 rounded-full bg-purple-500 text-white flex justify-center items-center transition hover:bg-purple-600 hover:scale-110">
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
            
            <p className="mt-8">
              La musique est le langage de mes émotions, le miroir de mon âme. Chaque mélodie raconte une histoire, chaque note évoque un sentiment particulier.
            </p>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section id="journal" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl mb-16 text-center text-purple-500">Journal de mes Émotions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                date: "12 Mai 2025",
                title: "L'euphorie de l'instant",
                content: "Aujourd'hui, j'ai ressenti cette sensation rare d'être parfaitement aligné avec l'univers. Un moment de pure clarté où tout semblait à sa place, où chaque respiration était une célébration silencieuse de l'existence...",
                tags: ["Joie", "Plénitude"]
              },
              {
                date: "5 Mai 2025",
                title: "Les murmures de la mélancolie",
                content: "La nostalgie m'a enveloppé comme une brume matinale aujourd'hui. Des souvenirs ressurgissent, doux et amers à la fois. Je me laisse porter par cette mélancolie, conscient qu'elle aussi fait partie du voyage...",
                tags: ["Mélancolie", "Réflexion"]
              },
              {
                date: "28 Avril 2025",
                title: "La sérénité du silence",
                content: "Dans le silence de l'aube, j'ai trouvé un espace de paix intérieure. Les pensées s'apaisent, le monde ralentit. Ces moments de calme sont comme des joyaux précieux dans le tumulte du quotidien...",
                tags: ["Sérénité", "Méditation"]
              }
            ].map((entry, index) => (
              <div 
                key={index}
                className="bg-white/5 rounded-lg p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-sm text-purple-500 mb-3">{entry.date}</div>
                <h3 className="text-2xl mb-4 text-white">{entry.title}</h3>
                <p className="text-gray-400 mb-5">{entry.content}</p>
                <div className="space-x-2">
                  {entry.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="inline-block px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#16213e]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl mb-16 text-center text-purple-500">Partagez vos Émotions</h2>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <p className="mb-4">
                Les émotions sont faites pour être partagées. N'hésitez pas à me contacter pour échanger sur nos ressentis, nos expériences ou simplement pour discuter.
              </p>
              <p>
                Je suis toujours ouvert à de nouvelles perspectives et à la découverte d'autres univers émotionnels.
              </p>
            </div>
            
            <div className="flex-2">
              <form>
                <div className="mb-5">
                  <input 
                    type="text" 
                    className="w-full p-4 bg-white/10 border-none rounded text-white text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="mb-5">
                  <input 
                    type="email" 
                    className="w-full p-4 bg-white/10 border-none rounded text-white text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Votre email"
                  />
                </div>
                <div className="mb-5">
                  <textarea 
                    className="w-full p-4 bg-white/10 border-none rounded text-white text-base min-h-36 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Partagez vos émotions..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="inline-block px-8 py-4 bg-purple-500 text-white border-none rounded text-base cursor-pointer transition-all hover:bg-purple-600 hover:-translate-y-1 hover:shadow-lg"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0f0f1a]">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8 flex justify-center space-x-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center text-white no-underline transition-all hover:bg-purple-500 hover:-translate-y-1">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center text-white no-underline transition-all hover:bg-purple-500 hover:-translate-y-1">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center text-white no-underline transition-all hover:bg-purple-500 hover:-translate-y-1">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex justify-center items-center text-white no-underline transition-all hover:bg-purple-500 hover:-translate-y-1">
              <Instagram size={18} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Mon Univers Émotionnel - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
}
