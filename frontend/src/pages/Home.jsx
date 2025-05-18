// src/components/Home.jsx
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiHappyBeaming, BiAngry } from "react-icons/bi";
import { FaRegSadCry, FaSurprise } from "react-icons/fa";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Dans ton tableau d’images :
  const images = [
    { src: "/emoji/happy.png", emotion: "joie" },
    { src: "/emoji/sad.png", emotion: "tristesse" },
    { src: "/emoji/angry.png", emotion: "colère" },
    { src: "/emoji/fear.png", emotion: "peur" },
  ];

  // Textes dynamiques associés à chaque émotion
  const emotionTexts = {
    joie: {
      title: "Un nouveau départ, le cœur léger",
      message:
        "Merci pour tous ces bons moments. Ce n’est qu’un au revoir, pas un adieu. Que la suite de ton voyage soit lumineuse !",
    },
    tristesse: {
      title: "Une page se tourne avec émotion",
      message:
        "Il est temps pour nous de prendre des chemins différents. Ce n’est pas facile, mais c’est nécessaire. Je te souhaite le meilleur.",
    },
    colère: {
      title: "Une décision difficile mais nécessaire",
      message:
        "Nous mettons fin à notre collaboration à effet immédiat. Cette décision a été prise avec sérieux et pour le bien de toutes les parties.",
    },
    peur: {
      title: "Changer fait peur, mais avancer est vital",
      message:
        "Même si l’incertitude domine aujourd’hui, je crois que ce choix est le bon. Le futur se construira un pas après l’autre.",
    },
  };

  // Dans ton render JSX :
  const currentEmotion = images[currentImageIndex].emotion;
  const { title, message } = emotionTexts[currentEmotion] || {};

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effet de parallaxe pour le curseur
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotation améliorée des images avec transition d'opacité
  useEffect(() => {
    const interval = setInterval(() => {
      setTextOpacity(0);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => setTextOpacity(1), 300);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-container futuristic-gradient">
      {/* Styles CSS */}
      <style jsx global>{`
        

        body {
          font-family: "Inter", "SF Pro Display", -apple-system,
            BlinkMacSystemFont, sans-serif;
        }

        .home-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        /* Dégradé futuriste */
        .futuristic-gradient {
          background: radial-gradient(
            circle at center,
            #e9d5ff 0%,
            /* violet clair */ #3b2250 30%,
            /* violet très foncé */ #23272f 100%
              /* gris très foncé à l'extérieur */
          );
          position: relative;
        }

        /* Effet de grille futuriste */
        .futuristic-gradient::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(
              to right,
              rgba(126, 34, 206, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(126, 34, 206, 0.1) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
          pointer-events: none;
        }

        /* Effet de lumière */
        .light-orb {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(
            circle at center,
            rgba(167, 139, 250, 0.7) 0%,
            rgba(139, 92, 246, 0.2) 50%,
            transparent 80%
          );
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.8;
          z-index: 0;
          pointer-events: none;
          transition: transform 0.6s ease-out;
        }

        /* Animations */
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          15% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          75% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
        }

        @keyframes floatUpDown {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        @keyframes floatDownUp {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(15px) rotate(-2deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(139, 92, 246, 0.4);
          }
        }

        @keyframes sway {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        .animate-fade {
          animation: fadeInOut 5s ease-in-out forwards;
        }

        .animate-float-outer {
          animation: floatUpDown 4s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.6));
        }

        .animate-float-inner {
          animation: floatDownUp 4s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.6));
        }

        .animate-sway {
          animation: sway 6s ease-in-out infinite;
        }

        /* Transition texte avec blur */
        .text-transition {
          transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out,
            filter 0.8s ease-in-out;
        }

        /* Styles pour texte futuriste */
        .text-gradient {
          background: linear-gradient(to right, #fff, #c4b5fd);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.07);
          transform: translateY(-5px);
        }

        

        /* Optimisations pour mobile */
        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem;
            line-height: 2.5rem;
          }

          .light-orb {
            width: 100vw;
            height: 100vw;
            opacity: 0.6;
          }
        }
      `}</style>

      {/* Effet de lumière dynamic */}
      <div
        className="light-orb"
        style={{
          transform: `translate(${mousePosition.x * 20 - 10}%, ${
            mousePosition.y * 20 - 10
          }%)`,
          left: `calc(50% - 30vw)`,
          top: `calc(50% - 30vw)`,
        }}
      ></div>

      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 backdrop-blur-md p-4 transition-all duration-300 ${
          isScrolled ? "nav-scrolled" : "nav-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-5">
            {/* Logo */}
            <a
              href="/"
              className="text-2xl font-bold text-white flex items-center hover:scale-105 transition-transform"
            >
              <img src="/logo.png" alt="Logo" className="h-20 w-20" />
            </a>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/login"
                className="px-5 py-2 rounded-md border-2 border-white font-bold text-white hover:bg-white hover:text-slate-800 transition-colors duration-300"
              >
                Se connecter
              </a>
              <a
                href="/signup "
                className="px-5 py-2 rounded-md border-2 border-white font-bold bg-white text-slate-800 hover:bg-transparent hover:text-white transition-all duration-300"
              >
                S'inscrire
              </a>
            </div>

            {/* Bouton menu mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                  isScrolled ? "text-gray-700" : "text-white"
                } focus:outline-none transition-transform hover:scale-110`}
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Menu mobile */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 bg-blend-saturation backdrop-blur-3xl rounded-lg shadow-lg">
              <a
                href="/login"
                className="block px-4 py-3 rounded-lg text-center text-white border-3 border-slate-100 hover:bg-white hover:text-slate-800 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </a>
              <a
                href="/register"
                className="block px-4 py-3 rounded-lg text-center bg-white text-slate-500 hover:bg-transparent hover:text-slate-100 hover:border-3 hover:border-slate-100 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </nav>


      {/* Contenu principal */}
      <div className="absolute inset-0 z-10 right-10 bottom-10">
        {/* Texte dynamique selon émotion */}
        <div
          className="glass-card absolute left-10 top-30 text-center w-[90%] max-w-xl text-white text-transition z-20"
          style={{
            opacity: textOpacity,
            transform: `translateY(${(1 - textOpacity) * 30}px)`,
            filter: `blur(${(1 - textOpacity) * 10}px)`,
          }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gradient mb-2">
            {title}
          </h2>
          <p className="text-sm md:text-base">{message}</p>
        </div>

        {/* Icônes avec animation améliorée */}
        <div
          className="absolute bottom-32 right-5 h-fit text-white text-transition max-[1130px]:hidden glass-card"
          style={{
            opacity: textOpacity,
            transform: `translateY(${(1 - textOpacity) * -30}px)`,
            filter: `blur(${(1 - textOpacity) * 10}px)`,
          }}
        >
          <p className="text-xl md:text-2xl font-medium mb-4">
            <span className="text-gradient">Explorez</span> nos émotions
          </p>
          <div className="flex space-x-6 text-purple-200">
            <BiHappyBeaming className="w-10 h-10 md:w-16 md:h-16 animate-float-outer" />
            <FaRegSadCry className="w-10 h-10 md:w-16 md:h-16 animate-float-inner" />
            <BiAngry className="w-10 h-10 md:w-16 md:h-16 animate-float-outer" />
            <FaSurprise className="w-10 h-10 md:w-16 md:h-16 animate-float-inner" />
          </div>
        </div>

        {/* Bouton d'action principal */}
        <div
          className="absolute md:bottom-16 text-transition pointer-events-auto 
             max-[1129px]:left-1/2 max-[1129px]:right-auto max-[1129px]:transform max-[1129px]:-translate-x-1/2
             min-[1130px]:right-8
             bottom-3
             md:min-[1130px]:right-16
             lg:min-[1130px]:right-24"
          style={{
            opacity: textOpacity,
            transform: `translateY(${(1 - textOpacity) * 30}px)`,
            filter: `blur(${(1 - textOpacity) * 10}px)`,
          }}
        >
          <button className="px-8 py-3 md:px-10 md:py-3 hover:text-white rounded-lg border-2 border-white font-bold bg-white text-gray-700 hover:bg-transparent hover:scale-105 transition-all duration-300 shadow-lg">
            <a href="#" className="text-sm md:text-base">
              Commencer l'experience
            </a>
          </button>
        </div>
      </div>

      {/* Slider d'images amélioré */}
      <div className="pt-16 h-screen flex items-center justify-center relative overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full flex justify-center transition-opacity duration-500 ${
              index === currentImageIndex ? "animate-fade" : "opacity-0"
            }`}
          >
            <img
              src={img.src}
              alt={`Slide ${index + 1}`}
              className="md:max-h-[70vh] max-h-[30vh] md:max-w-[90vw] object-contain"
              style={{
                filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))",
                transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${
                  (mousePosition.y - 0.5) * -20
                }px)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;