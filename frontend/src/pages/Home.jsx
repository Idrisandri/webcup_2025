// src/components/Home.jsx
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiAngry, BiHappyBeaming } from "react-icons/bi";
import { FaRegSadCry } from "react-icons/fa";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);

  const images = [
    {
      src: "/emoji/happy.png",
    },
    {
      src: "/emoji/sad.png",
    },
    {
      src: "/emoji/angry.png",
    },
    {
      src: "/emoji/fear.png",
    },
  ];

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rotation automatique des images avec transition d'opacité
  useEffect(() => {
    const interval = setInterval(() => {
      setTextOpacity(0.3);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => setTextOpacity(1), 200);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-container slate-gradient">
      {/* Styles CSS */}
      <style jsx global>{`
        /* Styles de base */
        .home-container {
          min-height: 100vh;
          width: 100%;
          overflow-x: hidden;
        }

        /* Dégradé radial gris fixe */
        .slate-gradient {
          background: radial-gradient(
            ellipse at center,
            rgba(203, 213, 225, 1) 0%,
            rgba(100, 116, 139, 1) 50%,
            rgba(30, 41, 59, 1) 100%
          );
        }

        /* Animations */
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(50%);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          75% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-50%);
          }
        }

        @keyframes floatUpDown {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes floatDownUp {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
        }

        .animate-fade {
          animation: fadeInOut 4s ease-in-out forwards;
        }

        .animate-float-outer {
          animation: floatUpDown 3.5s ease-in-out infinite;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }

        .animate-float-inner {
          animation: floatDownUp 3.5s ease-in-out infinite;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }

        /* Transition texte */
        .text-transition {
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }

        /* Navbar */
        .nav-scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0;
        }

        .nav-transparent {
          background-color: transparent;
          padding: 1rem 0;
        }

        /* Optimisations pour mobile */
        @media (max-width: 768px) {
          .corner-text {
            font-size: 0.9rem;
            padding: 0 1rem;
          }
          .main-title {
            font-size: 1.8rem;
            line-height: 2.2rem;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "nav-scrolled" : "nav-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="/"
              className="text-2xl font-bold text-white flex items-center hover:scale-105 transition-transform"
            >
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </a>

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/login"
                className="px-5 py-2 rounded-md border-2 border-white font-bold text-white hover:bg-white hover:text-slate-800 transition-colors duration-300"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="px-5 py-2 rounded-md border-2 border-white font-bold bg-white text-slate-800 hover:bg-transparent hover:text-white transition-all duration-300"
              >
                Sign Up
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
                className="block px-4 py-3 rounded-lg text-center text-white hover:bg-white hover:text-slate-800 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="block px-4 py-3 rounded-lg text-center bg-white text-slate-500 hover:bg-red-500 hover:text-slate-700 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Texte haut gauche */}
        <div
          className="absolute text-white main-title text-transition"
          style={{
            opacity: textOpacity,
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "800px",
          }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center hidden max-[1130px]:block">
            Bienvenue sur notre <br className="hidden sm:block" />
            site La au tous <br className="hidden sm:block" />
            finir avec attitude
          </h1>
        </div>

        <div
          className="absolute top-10 left-8 md:top-20 md:left-16 lg:top-70 lg:left-24 text-white main-title text-transition max-[1130px]:hidden"
          style={{ opacity: textOpacity }}
        >
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mt-[-100px]">
            Bienvenue sur notre <br /> site La au tous <br /> finir avec
            attitude
          </h1>
        </div>

        <div
          className="absolute bottom-16 left-25 md:bottom-20 md:right-16 lg:bottom-37 lg:right-40 text-transition pointer-events-auto text-white w-90 max-[1130px]:hidden"
          style={{ opacity: textOpacity }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque,
          repudiandae illum blanditiis nostrum totam fugit minus ratione mo
        </div>

        {/* Icônes haut droite avec animation */}
        <div
          className="absolute top-16 right-8 md:top-20 md:right-16 lg:top-40 lg:right-34 text-white text-sm text-transition flex flex-col items-end max-[1130px]:hidden"
          style={{ opacity: textOpacity }}
        >
          <p className="text-lg md:text-xl font-medium mb-3">
            Explorez nos services
          </p>
          <div className="flex space-x-4 text-slate-300">
            <BiHappyBeaming className="w-10 h-10 md:w-12 md:h-12 animate-float-outer" />
            <FaRegSadCry className="w-9 h-9 md:w-11 md:h-11 animate-float-inner" />
            <BiAngry className="w-10 h-10 md:w-12 md:h-12 animate-float-outer" />
          </div>
        </div>

        {/* Bouton bas droite */}
        <div
          className="absolute bottom-16 text-transition pointer-events-auto
             max-[1129px]:left-1/2 max-[1129px]:right-auto max-[1129px]:transform max-[1129px]:-translate-x-1/2
             min-[1130px]:right-8
             md:bottom-10
             md:min-[1130px]:right-16
             lg:min-[1130px]:right-40"
          style={{ opacity: textOpacity }}
        >
          <button className="px-8 py-3 md:px-10 md:py-3 rounded-lg border-2 border-white font-bold bg-white text-gray-700 hover:bg-transparent hover:scale-105 transition-all duration-300 shadow-lg">
            <a href="#" className="text-sm md:text-base">
              Get Started
            </a>
          </button>
        </div>
      </div>

      {/* Slider d'images */}
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
              className="max-h-[70vh] max-w-[90vw] object-contain"
              style={{ filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;