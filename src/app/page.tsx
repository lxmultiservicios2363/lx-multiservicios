// src/app/page.tsx - VERSIÓN CORREGIDA PARA NUEVO LAYOUT
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { 
    id: 1,
    title: "Suéteres Tejidos", 
    subtitle: "Para Toda Ocasión"
  },
  { 
    id: 2,
    title: "Busos | Sudaderas | Camisetas", 
    subtitle: "Calidad y estilo para ti"
  },
  { 
    id: 3,
    title: "Tazas, Cojines y Tomatodos", 
    subtitle: "Obsequios para toda fecha y ocasión"
  },
  { 
    id: 4,
    title: "", 
    subtitle: ""
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [mounted]);

  const getImageUrl = (slideId: number) => {
    return `/sliders/slider${slideId}-desktop.webp`;
  };

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="min-h-screen pt-8"> {/* ✅ AGREGADO pt-8 para separación del header */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto px-4"> {/* ✅ AGREGADO max-w-7xl mx-auto px-4 */}
        
        {/* ✅ SLIDER CORREGIDO */}
        <section className="relative w-full h-[150px] sm:h-[280px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 mt-4"> {/* ✅ AJUSTADO heights y mt-4 */}
          <div className="flex transition-transform duration-1000 ease-in-out w-full h-full" 
               style={{ transform: `translateX(-${current * 100}%)` }}>
            
            {SLIDES.map((slide, i) => (
              <div key={slide.id} className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
                
                {/* ✅ IMAGEN OPTIMIZADA */}
                <Image
                  src={getImageUrl(slide.id)}
                  alt={slide.title || `Slide ${slide.id}`}
                  width={1200}
                  height={600}
                  className="object-cover w-full h-full"
                  priority={i < 2}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
                />
                
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-4">
                  {slide.title && (
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                      {slide.title}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl drop-shadow-lg opacity-90 font-light">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* ✅ BOTONES INDICADORES MÁS VISIBLES */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
                  i === current ? "bg-white scale-110 shadow-lg" : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ✅ SECCIÓN BOTÓN CENTRADA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full py-6 sm:py-8"> {/* ✅ AGREGADO padding vertical */}
          <div className="grid grid-cols-1 justify-items-center">
            <Link 
              href="/catalogo" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-base sm:text-lg font-bold min-w-[160px] text-center border border-white/20 hover:scale-105 transform hover:shadow-xl"
            >
              Ver Catálogo
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}