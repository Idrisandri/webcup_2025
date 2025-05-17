import { useState } from 'react';
import { Sun, Layout, Grid, ListTodo, Sparkles, Check } from 'lucide-react';

// Définition des palettes de couleurs joyeuses
const colorPalettes = {
  sunrise: {
    name: "Lever de soleil",
    primary: "bg-orange-500",
    secondary: "bg-yellow-400",
    accent: "bg-pink-500",
    text: "text-orange-900",
    bgLight: "bg-orange-50",
    bgDark: "bg-orange-100",
    border: "border-orange-200"
  },
  summer: {
    name: "Été vibrant",
    primary: "bg-emerald-500",
    secondary: "bg-teal-400",
    accent: "bg-yellow-500",
    text: "text-emerald-900",
    bgLight: "bg-emerald-50",
    bgDark: "bg-emerald-100",
    border: "border-emerald-200"
  },
  candy: {
    name: "Bonbons",
    primary: "bg-purple-500",
    secondary: "bg-fuchsia-400",
    accent: "bg-blue-500",
    text: "text-purple-900",
    bgLight: "bg-purple-50",
    bgDark: "bg-purple-100",
    border: "border-purple-200"
  }
};

// Définition des dispositions
const layouts = {
  classic: {
    name: "Classique",
    icon: <Layout size={20} />,
    description: "Titre en haut, contenu dessous"
  },
  twoColumns: {
    name: "Deux colonnes",
    icon: <Grid size={20} />,
    description: "Contenu divisé en deux"
  },
  titleOnly: {
    name: "Grand titre",
    icon: <Sun size={20} />,
    description: "Titre centré sur toute la page"
  },
  list: {
    name: "Liste à puces",
    icon: <ListTodo size={20} />,
    description: "Optimisé pour les listes"
  }
};

export default function Disposition() {
  const [selectedPalette, setSelectedPalette] = useState("summer");
  const [selectedLayout, setSelectedLayout] = useState("classic");
  const [showPaletteSelector, setShowPaletteSelector] = useState(false);

  // Fonction pour générer une maquette de slide en fonction de la disposition
  const renderSlidePreview = (layoutType) => {
    const palette = colorPalettes[selectedPalette];
    
    switch(layoutType) {
      case "classic":
        return (
          <div className={`w-full h-full ${palette.bgLight} rounded-lg overflow-hidden border ${palette.border}`}>
            <div className={`w-full p-3 ${palette.primary} ${palette.text.replace("900", "50")}`}>
              <div className="h-3 w-24 bg-white/70 rounded-full mb-1"></div>
              <div className="h-2 w-16 bg-white/50 rounded-full"></div>
            </div>
            <div className="p-3">
              <div className="h-2 w-full bg-gray-300 rounded-full mb-2"></div>
              <div className="h-2 w-5/6 bg-gray-300 rounded-full mb-2"></div>
              <div className="h-2 w-4/6 bg-gray-300 rounded-full mb-4"></div>
              <div className={`h-16 w-full ${palette.secondary} opacity-30 rounded-lg mb-3`}></div>
              <div className="h-2 w-full bg-gray-300 rounded-full mb-2"></div>
              <div className="h-2 w-3/6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        );
        
      case "twoColumns":
        return (
          <div className={`w-full h-full ${palette.bgLight} rounded-lg overflow-hidden border ${palette.border}`}>
            <div className={`w-full p-3 ${palette.primary} ${palette.text.replace("900", "50")}`}>
              <div className="h-3 w-24 bg-white/70 rounded-full"></div>
            </div>
            <div className="p-3 flex gap-2">
              <div className="w-1/2">
                <div className="h-2 w-full bg-gray-300 rounded-full mb-2"></div>
                <div className="h-2 w-5/6 bg-gray-300 rounded-full mb-2"></div>
                <div className={`h-20 w-full ${palette.secondary} opacity-30 rounded-lg mb-2`}></div>
                <div className="h-2 w-3/6 bg-gray-300 rounded-full"></div>
              </div>
              <div className="w-1/2">
                <div className={`h-16 w-full ${palette.accent} opacity-30 rounded-lg mb-3`}></div>
                <div className="h-2 w-full bg-gray-300 rounded-full mb-2"></div>
                <div className="h-2 w-4/6 bg-gray-300 rounded-full mb-2"></div>
                <div className="h-2 w-5/6 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        );
        
      case "titleOnly":
        return (
          <div className={`w-full h-full ${palette.bgLight} flex flex-col items-center justify-center rounded-lg overflow-hidden border ${palette.border}`}>
            <div className={`h-8 w-32 ${palette.primary} rounded-full mb-2`}></div>
            <div className={`h-4 w-48 ${palette.secondary} rounded-full mb-6`}></div>
            <div className={`h-16 w-16 ${palette.accent} rounded-full flex items-center justify-center`}>
              <Sparkles size={24} className="text-white" />
            </div>
          </div>
        );
        
      case "list":
        return (
          <div className={`w-full h-full ${palette.bgLight} rounded-lg overflow-hidden border ${palette.border}`}>
            <div className={`w-full p-3 ${palette.primary} ${palette.text.replace("900", "50")}`}>
              <div className="h-3 w-24 bg-white/70 rounded-full"></div>
            </div>
            <div className="p-3">
              <div className="flex items-center mb-2">
                <div className={`h-3 w-3 mr-2 rounded-full ${palette.accent}`}></div>
                <div className="h-2 w-5/6 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex items-center mb-2">
                <div className={`h-3 w-3 mr-2 rounded-full ${palette.accent}`}></div>
                <div className="h-2 w-4/6 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex items-center mb-2">
                <div className={`h-3 w-3 mr-2 rounded-full ${palette.accent}`}></div>
                <div className="h-2 w-5/6 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex items-center mb-2">
                <div className={`h-3 w-3 mr-2 rounded-full ${palette.accent}`}></div>
                <div className="h-2 w-3/6 bg-gray-300 rounded-full"></div>
              </div>
              <div className={`h-12 w-full ${palette.secondary} opacity-30 rounded-lg mt-4`}></div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <header className={`sticky top-0 z-10 border-b ${colorPalettes[selectedPalette].border} shadow-lg backdrop-blur-md bg-white/80 transition-all duration-500`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full ${colorPalettes[selectedPalette].accent} shadow-lg flex items-center justify-center transform transition-all duration-500 hover:scale-110`}>
              <Sparkles size={20} className="text-white" />
            </div>
            
            <h1 className="text-2xl font-bold tracking-tight transition-transform duration-500">
              Disposition du Slide
              <div className={`h-1 w-24 mt-1 ${colorPalettes[selectedPalette].accent} rounded-full`}></div>
            </h1>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowPaletteSelector(!showPaletteSelector)}
              className={`p-3 rounded-full ${colorPalettes[selectedPalette].primary} text-white shadow-lg transform transition-transform hover:scale-105 focus:outline-none`}
            >
              <Sun size={18} />
            </button>
            
            {showPaletteSelector && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl backdrop-blur-md bg-white/90 border border-gray-200 overflow-hidden z-10 transform transition-all duration-200 origin-top-right">
                <div className="py-2">
                  {Object.keys(colorPalettes).map((paletteName) => (
                    <button
                      key={paletteName}
                      onClick={() => { 
                        setSelectedPalette(paletteName);
                        setShowPaletteSelector(false);
                      }}
                      className={`flex items-center w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors ${
                        selectedPalette === paletteName ? "font-medium" : ""
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full mr-3 ${colorPalettes[paletteName].primary}`}></div>
                      {colorPalettes[paletteName].name}
                      {selectedPalette === paletteName && (
                        <div className="ml-auto">
                          <Check size={16} className="text-green-500" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="my-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.keys(layouts).map((layoutType) => (
            <div 
              key={layoutType}
              onClick={() => setSelectedLayout(layoutType)}
              className={`cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                selectedLayout === layoutType 
                  ? `border-${colorPalettes[selectedPalette].primary.split('-')[1]}-500 shadow-lg` 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="aspect-w-16 aspect-h-9 h-32">
                {renderSlidePreview(layoutType)}
              </div>
              <div className={`p-3 border-t ${colorPalettes[selectedPalette].border}`}>
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-full ${
                    selectedLayout === layoutType ? colorPalettes[selectedPalette].primary : 'bg-gray-100'
                  }`}>
                    {layouts[layoutType].icon}
                  </div>
                  <h3 className="font-medium">{layouts[layoutType].name}</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">{layouts[layoutType].description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <div className={`mt-8 p-6 rounded-lg border ${colorPalettes[selectedPalette].border} ${colorPalettes[selectedPalette].bgLight}`}>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${colorPalettes[selectedPalette].accent}`}></div>
          Aperçu du template sélectionné
        </h2>
        
        <div className="aspect-w-16 aspect-h-9 max-w-md mx-auto border shadow-lg rounded-lg overflow-hidden">
          {renderSlidePreview(selectedLayout)}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Template <span className="font-medium">{layouts[selectedLayout].name}</span> avec 
            palette <span className="font-medium">{colorPalettes[selectedPalette].name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}