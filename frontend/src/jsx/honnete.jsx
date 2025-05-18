import { useState, useEffect } from 'react';

export default function MonUniversInterieur() {
  const [isScrollTopActive, setIsScrollTopActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle scroll to top button visibility
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrollTopActive(true);
      } else {
        setIsScrollTopActive(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-purple-50 flex justify-center items-center z-50">
        <div className="w-16 h-16 border-4 border-purple-100 rounded-full border-t-pink-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-purple-50 text-purple-800 leading-relaxed transition-all duration-300">
      {/* Header */}
      <header className="bg-purple-600 text-white py-12 text-center relative overflow-hidden rounded-b-xl shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-70 z-0" style={{ backgroundImage: "url('/api/placeholder/1200/600')" }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
        <div className="relative z-20">
          <h1 className="text-5xl mb-2 font-light tracking-wide">Mon Univers Intérieur</h1>
          <p className="text-xl italic opacity-90">Un espace personnel où mes émotions prennent vie</p>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-white py-4 shadow-md sticky top-0 z-40 mx-auto mt-4 w-[90%] max-w-6xl rounded-xl">
        <ul className="flex justify-center md:flex-row flex-col items-center">
          <li className="md:mx-6 my-2 md:my-0">
            <button 
              onClick={() => scrollToSection('accueil')}
              className="text-purple-800 font-medium transition-all duration-300 py-2 relative hover:text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Accueil
            </button>
          </li>
          <li className="md:mx-6 my-2 md:my-0">
            <button 
              onClick={() => scrollToSection('galerie')}
              className="text-purple-800 font-medium transition-all duration-300 py-2 relative hover:text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Galerie
            </button>
          </li>
          <li className="md:mx-6 my-2 md:my-0">
            <button 
              onClick={() => scrollToSection('videos')}
              className="text-purple-800 font-medium transition-all duration-300 py-2 relative hover:text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Vidéos
            </button>
          </li>
          <li className="md:mx-6 my-2 md:my-0">
            <button 
              onClick={() => scrollToSection('journal')}
              className="text-purple-800 font-medium transition-all duration-300 py-2 relative hover:text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Journal
            </button>
          </li>
          <li className="md:mx-6 my-2 md:my-0">
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-purple-800 font-medium transition-all duration-300 py-2 relative hover:text-pink-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
      
      {/* Accueil Section */}
      <section id="accueil" className="max-w-6xl mx-auto px-8 py-12 relative">
        <div className="absolute rounded-full w-72 h-72 bg-pink-500 opacity-5 -top-36 -right-36 z-0"></div>
        <h2 className="text-center mb-12 relative font-light text-purple-600 tracking-wide text-3xl after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-cyan-300 after:rounded">Bienvenue dans mon monde</h2>
        <div className="animate-fadeIn">
          <p className="mb-4">Ici, je partage mes émotions, mes pensées et mes expériences à travers des images et des vidéos qui me touchent. Ce site est le reflet de mon univers intérieur, un espace où je peux exprimer librement ce que je ressens et ce qui me fait vibrer.</p>
          <p>Chaque image, chaque vidéo raconte une histoire, un moment de ma vie, une émotion que j'ai ressentie. J'espère que vous prendrez le temps de découvrir ces fragments de mon âme et que, peut-être, vous y trouverez un écho à vos propres sentiments.</p>
        </div>
        <div className="absolute rounded-full w-52 h-52 bg-cyan-300 opacity-5 -bottom-24 -left-24 z-0"></div>
      </section>
      
      {/* Galerie Section */}
      <section id="galerie" className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-center mb-12 relative font-light text-purple-600 tracking-wide text-3xl after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-cyan-300 after:rounded">Galerie d'émotions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
          {[
            { title: "Sérénité", desc: "Ce moment de calme où tout semble s'arrêter." },
            { title: "Nostalgie", desc: "Ces souvenirs qui nous hantent et nous réconfortent à la fois." },
            { title: "Joie", desc: "Ces instants précieux où le bonheur nous submerge." },
            { title: "Mélancolie", desc: "Cette douce tristesse qui nous rappelle que nous sommes vivants." },
            { title: "Espoir", desc: "Cette lumière au bout du tunnel qui nous guide." },
            { title: "Contemplation", desc: "Observer le monde et se perdre dans ses pensées." }
          ].map((item, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-400 cursor-pointer hover:-translate-y-2.5 hover:shadow-xl group">
              <img src={`/api/placeholder/400/300`} alt={item.title} className="w-full h-70 object-cover block transition-transform duration-800 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white p-8 pt-6 transform translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0">
                <h3 className="mb-2 font-medium text-xl">{item.title}</h3>
                <p className="text-sm italic opacity-90">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Video Section */}
      <section id="videos" className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-center mb-12 relative font-light text-purple-600 tracking-wide text-3xl after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-cyan-300 after:rounded">Mes moments en mouvement</h2>
        <p className="text-center max-w-xl mx-auto mb-8">Les vidéos capturent ce que les mots ne peuvent exprimer - le mouvement de la vie, les nuances des émotions, les sons qui touchent l'âme.</p>
        
        <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-[90%] mx-auto rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 text-center">
            <h3 className="text-3xl mb-4 font-light tracking-wide">Vidéo: "Réflexions sur l'océan"</h3>
            <p className="max-w-xl italic opacity-90">Une méditation visuelle sur les vagues et leurs murmures</p>
          </div>
        </div>
        
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 bg-pink-100 text-pink-500 font-medium rounded-full text-sm">À propos de cette vidéo</div>
          <p className="mt-3">J'ai filmé cette vidéo lors d'une période difficile de ma vie. L'océan, avec son mouvement perpétuel, m'a rappelé que rien n'est permanent - ni les joies, ni les peines. Chaque vague est unique, tout comme chaque moment de notre existence.</p>
        </div>
      </section>
      
      {/* Quote Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20 text-center my-20 relative overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full bg-cyan-300 opacity-10 -top-24 -left-24"></div>
        <div className="absolute w-72 h-72 rounded-full bg-pink-500 opacity-10 -bottom-24 -right-24"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <p className="text-4xl font-light leading-relaxed max-w-3xl mx-auto md:text-2xl">
            "Les émotions sont comme les couleurs - infinies dans leurs nuances, profondes dans leur signification, et essentielles à la beauté de notre existence."
          </p>
          <p className="mt-6 font-medium text-lg opacity-90 tracking-wide">— Un rappel personnel</p>
        </div>
      </div>
      
      {/* Journal Section */}
      <section id="journal" className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-center mb-12 relative font-light text-purple-600 tracking-wide text-3xl after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-cyan-300 after:rounded">Journal de bord émotionnel</h2>
        
        <div className="bg-white p-10 rounded-xl shadow-lg relative">
          <div className="absolute top-[-20px] left-5 text-6xl text-pink-500 opacity-10">❝</div>
          
          {[
            {
              date: "17 mai 2025",
              title: "La beauté dans la simplicité",
              content: [
                "Aujourd'hui, j'ai redécouvert la joie dans les petites choses. Un rayon de soleil traversant ma fenêtre, dessinant des motifs sur le sol. Le parfum d'un café fraîchement préparé. Le sourire d'un inconnu dans la rue. Ces moments fugaces sont souvent ceux qui marquent le plus notre âme.",
                "Je me demande pourquoi nous courons toujours après de grandes réalisations, alors que le bonheur se cache dans ces instants simples et authentiques."
              ]
            },
            {
              date: "10 mai 2025",
              title: "Traverser l'orage",
              content: [
                "Les émotions négatives ne sont pas à fuir. Elles font partie intégrante de notre humanité. Aujourd'hui, j'ai embrassé ma tristesse, je l'ai laissée me traverser comme un orage d'été. Intense, mais éphémère.",
                "C'est en acceptant toutes nos émotions, même les plus sombres, que nous pouvons vraiment nous connaître et grandir."
              ]
            },
            {
              date: "1 mai 2025",
              title: "Connexions invisibles",
              content: [
                "J'ai croisé une personne aujourd'hui dont le regard m'a transpercé l'âme. Un échange de quelques secondes, sans un mot, mais chargé d'une intensité rare. Ces connexions mystérieuses me fascinent - comment deux êtres peuvent-ils communiquer aussi profondément sans se connaître?",
                "Peut-être que nos âmes se reconnaissent d'une vie antérieure, ou peut-être que nous sommes simplement capables de percevoir l'humanité en chacun de nous, au-delà des apparences."
              ]
            }
          ].map((entry, index, arr) => (
            <div key={index} className={`mb-10 pb-10 ${index !== arr.length - 1 ? 'border-b border-purple-100' : ''}`}>
              <div className="inline-block px-4 py-1 bg-pink-100 text-pink-500 font-medium rounded-full text-sm mb-3">{entry.date}</div>
              <h3 className="mb-4 text-purple-600 font-medium text-xl">{entry.title}</h3>
              {entry.content.map((paragraph, i) => (
                <p key={i} className="mb-4 leading-7 last:mb-0">{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-center mb-12 relative font-light text-purple-600 tracking-wide text-3xl after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-gradient-to-r after:from-pink-500 after:to-cyan-300 after:rounded">Partagez vos émotions</h2>
        <p className="text-center mb-8 max-w-2xl mx-auto">Si vous avez ressenti un écho à ce que vous avez vu ici, j'aimerais vous entendre. Partagez vos propres émotions, expériences ou simplement un bonjour.</p>
        
        <div className="max-w-xl mx-auto bg-white p-12 rounded-xl shadow-lg relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 to-cyan-300 rounded-t-xl"></div>
          
          <div className="mb-8 relative">
            <label className="block mb-3 font-medium text-purple-600 pl-2 relative before:content-[''] before:absolute before:left-0 before:top-1 before:h-4 before:w-0.5 before:bg-pink-500 before:rounded">Votre nom</label>
            <input type="text" placeholder="Comment vous appeler?" className="w-full p-4 border border-purple-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-pink-500 focus:shadow-md focus:shadow-pink-100" />
          </div>
          
          <div className="mb-8 relative">
            <label className="block mb-3 font-medium text-purple-600 pl-2 relative before:content-[''] before:absolute before:left-0 before:top-1 before:h-4 before:w-0.5 before:bg-pink-500 before:rounded">Votre email</label>
            <input type="email" placeholder="Pour vous répondre" className="w-full p-4 border border-purple-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-pink-500 focus:shadow-md focus:shadow-pink-100" />
          </div>
          
          <div className="mb-8 relative">
            <label className="block mb-3 font-medium text-purple-600 pl-2 relative before:content-[''] before:absolute before:left-0 before:top-1 before:h-4 before:w-0.5 before:bg-pink-500 before:rounded">L'émotion qui vous habite aujourd'hui</label>
            <input type="text" placeholder="En un mot" className="w-full p-4 border border-purple-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-pink-500 focus:shadow-md focus:shadow-pink-100" />
          </div>
          
          <div className="mb-8 relative">
            <label className="block mb-3 font-medium text-purple-600 pl-2 relative before:content-[''] before:absolute before:left-0 before:top-1 before:h-4 before:w-0.5 before:bg-pink-500 before:rounded">Votre message</label>
            <textarea placeholder="Partagez ce que vous ressentez" className="w-full p-4 border border-purple-200 rounded-xl text-base h-44 resize-y transition-all duration-300 focus:outline-none focus:border-pink-500 focus:shadow-md focus:shadow-pink-100"></textarea>
          </div>
          
          <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white border-none px-8 py-4 text-base rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-200 active:translate-y-0.5 shadow-md shadow-pink-100">Envoyer</button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-center py-12 mt-20 relative overflow-hidden">
        <div className="absolute top-[-30px] left-0 w-full h-16 bg-purple-50 rounded-[50%_50%_0_0]"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <p className="mb-4 opacity-90">&copy; 2025 Mon Univers Intérieur - Un site personnel dédié à l'expression des émotions</p>
          <p className="italic text-sm opacity-70">Créé avec sincérité et authenticité</p>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-pink-500 text-white rounded-full flex justify-center items-center text-2xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${isScrollTopActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        ↑
      </button>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
