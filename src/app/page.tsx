// src/app/page.tsx - SLIDER MÁS COMPACTO
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
    <div className="min-h-screen">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6">
        
        {/* ✅ SLIDER MÁS COMPACTO EN MÓVIL */}
        <section className="relative w-full h-[100px] sm:h-[250px] md:h-[350px] overflow-hidden rounded-b-2xl shadow-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="flex transition-transform duration-1000 ease-in-out w-full h-full" 
               style={{ transform: `translateX(-${current * 100}%)` }}>
            
            {SLIDES.map((slide, i) => (
              <div key={slide.id} className="relative w-full h-full flex-shrink-0">
                
                <Image
                  src={getImageUrl(slide.id)}
                  alt={slide.title || `Slide ${slide.id}`}
                  fill
                  className="object-cover"
                  priority={i < 2}
                  sizes="100vw"
                />
                
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                  {slide.title && (
                    <h2 className="text-sm sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                      {slide.title}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-xs sm:text-sm md:text-base drop-shadow-lg opacity-90">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  i === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-3 sm:px-4 w-full">
          <div className="grid grid-cols-1 justify-items-center">
            <Link 
              href="/catalogo" 
              className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-2.5 px-6 rounded-lg shadow-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-300 text-sm font-bold min-w-[140px] text-center border border-white/20 hover:scale-105"
            >
              Ver Catálogo
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}