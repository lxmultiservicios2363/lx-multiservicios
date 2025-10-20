// src/app/page.tsx - ACTUALIZADO CON NUEVOS COLORES
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
  }, []);

  const getImageUrl = (slideId: number) => {
    return `/sliders/slider${slideId}-desktop.webp`;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
        
        {/* SLIDER CON NUEVOS COLORES */}
        <section className="relative w-full h-[180px] sm:h-[300px] md:h-[420px] lg:h-[520px] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 mt-6">
          <div className="flex transition-transform duration-1000 ease-in-out w-full h-full" 
               style={{ transform: `translateX(-${current * 100}%)` }}>
            
            {SLIDES.map((slide, i) => (
              <div key={slide.id} className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
                
                <Image
                  src={getImageUrl(slide.id)}
                  alt={slide.title || `Slide ${slide.id}`}
                  width={1200}
                  height={600}
                  className="object-cover w-full h-full"
                  priority={i < 2}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
                />
                
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                  {slide.title && (
                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-2xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      {slide.title}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-base sm:text-xl md:text-2xl lg:text-3xl drop-shadow-2xl opacity-95 font-light max-w-2xl">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* BOTONES INDICADORES MEJORADOS */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-300 ${
                  i === current 
                    ? "bg-white scale-125 shadow-2xl shadow-white/50" 
                    : "bg-white/50 hover:bg-white/80 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </section>

        {/* BOTÓN CON NUEVO DEGRADADO */}
        <section className="max-w-4xl mx-auto px-4 w-full py-8 sm:py-12">
          <div className="grid grid-cols-1 justify-items-center">
            <Link 
              href="/catalogo" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-12 rounded-2xl shadow-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-lg sm:text-xl font-bold min-w-[200px] text-center border-2 border-white/30 hover:scale-105 transform hover:shadow-purple-500/40 hover:border-white/50"
            >
              Ver Catálogo
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}