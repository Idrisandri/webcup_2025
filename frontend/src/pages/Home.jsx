// src/components/Home.jsx
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiHappyBeaming, BiAngry } from "react-icons/bi";
import { FaRegSadCry, FaSurprise } from "react-icons/fa";
import '../assets/home.css'
import emotionTexts from "../data/emotionTexts";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const images = [
    { src: "/emoji/happy.png", emotion: "joie" },
    { src: "/emoji/sad.png", emotion: "tristesse" },
    { src: "/emoji/angry.png", emotion: "colère" },
    { src: "/emoji/fear.png", emotion: "peur" },
  ];
  
  const currentEmotion = images[currentImageIndex].emotion;
  const { title, message } = emotionTexts[currentEmotion] || {};
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
      <nav
        className={`fixed w-full z-50 backdrop-blur-md p-4 transition-all duration-300 ${
          isScrolled ? "nav-scrolled" : "nav-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-5">
            <a
              href="/"
              className="text-2xl font-bold text-white flex items-center hover:scale-105 transition-transform"
            >
              <img src="/logo.png" alt="Logo" className="h-20 w-20" />
            </a>
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
      <div className="absolute inset-0 z-10 right-10 bottom-10">
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