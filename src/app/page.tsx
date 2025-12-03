// src/app/page.tsx - SLIDER PROPORCIONAL Y COMPLETO
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-orange-400/10">
        <div className="animate-pulse text-lg text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600/5 via-pink-500/5 to-orange-400/5">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* SLIDER PROPORCIONAL - IMÁGENES COMPLETAS */}
        <section className="relative w-full 
          h-[40vh]
          min-h-[250px]
          sm:h-[45vh]
          md:h-[50vh]
          lg:h-[55vh]
          xl:h-[60vh]
          max-h-[500px]
          overflow-hidden rounded-xl sm:rounded-2xl shadow-xl 
          bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 
          mt-4 sm:mt-6 mx-auto"
        >
          <div className="flex transition-transform duration-1000 ease-in-out w-full h-full" 
               style={{ transform: `translateX(-${current * 100}%)` }}>
            
            {SLIDES.map((slide, i) => (
              <div key={slide.id} className="relative w-full h-full flex-shrink-0">
                
                {/* CONTENEDOR DE IMAGEN */}
                <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
                  <Image
                    src={getImageUrl(slide.id)}
                    alt={slide.title || `Slide ${slide.id}`}
                    width={800}
                    height={400}
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                    priority={i < 2}
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 80vw, 75vw"
                    quality={85}
                  />
                </div>
                
                {/* OVERLAY DE TEXTO */}
                {(slide.title || slide.subtitle) && (
                  <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 z-10">
                    {slide.title && (
                      <h2 className="
                        text-lg sm:text-xl md:text-2xl lg:text-3xl
                        font-bold mb-2 sm:mb-3 
                        drop-shadow-2xl 
                        bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent 
                        leading-tight px-2
                      ">
                        {slide.title}
                      </h2>
                    )}
                    {slide.subtitle && (
                      <p className="
                        text-xs sm:text-sm md:text-base lg:text-lg
                        drop-shadow-2xl opacity-95 font-light 
                        max-w-xs sm:max-w-sm md:max-w-md
                        leading-relaxed px-2
                      ">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* INDICADORES DEL SLIDER */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`
                  w-2 h-2 sm:w-2.5 sm:h-2.5
                  rounded-full transition-all duration-300 
                  ${i === current 
                    ? "bg-white scale-110 shadow-lg shadow-white/40" 
                    : "bg-white/40 hover:bg-white/60 hover:scale-105"
                  }
                `}
              />
            ))}
          </div>
        </section>

        {/* BOTONES: CATÁLOGO + POLÍTICA DE PRIVACIDAD */}
        <section className="max-w-2xl mx-auto w-full py-6 sm:py-8 px-4">
          <div className="grid grid-cols-1 gap-4 justify-items-center">

            {/* Botón Catálogo */}
            <Link 
              href="/catalogo" 
              className="
                bg-gradient-to-r from-purple-600 to-pink-600 
                text-white 
                py-3 sm:py-3
                px-8 sm:px-10
                rounded-lg sm:rounded-xl
                shadow-lg 
                hover:from-purple-700 hover:to-pink-700 
                transition-all duration-300 
                text-base sm:text-lg
                font-bold 
                min-w-[150px]
                text-center 
                border-2 border-white/30 
                hover:scale-105 transform 
                hover:shadow-purple-500/30 
                hover:border-white/50
                active:scale-95
              "
            >
              Ver Catálogo
            </Link>

            {/* Botón Política de Privacidad */}
            <Link
              href="/politica-de-privacidad"
              className="
                bg-gray-800/80 
                text-white 
                py-2.5 sm:py-3
                px-8 sm:px-10
                rounded-lg sm:rounded-xl
                border border-white/20
                text-sm sm:text-base
                hover:bg-gray-900 
                transition-all duration-300
                min-w-[150px]
                text-center
                hover:scale-105
                active:scale-95
              "
            >
              Política de Privacidad
            </Link>

          </div>
        </section>

      </div>
    </div>
  );
}
