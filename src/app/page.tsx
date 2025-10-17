// src/app/page.tsx - COMPLETAMENTE RESPONSIVE
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ✅ SLIDERS CON LAS NUEVAS RUTAS CORRECTAS
const SLIDES = [
  { 
    id: 1,
    title: "Suéteres Tejidos", 
    subtitle: "Para Toda Ocasión",
    formats: ['webp', 'jpg', 'png']
  },
  { 
    id: 2,
    title: "Busos | Sudaderas | Camisetas", 
    subtitle: "Calidad y estilo para ti",
    formats: ['webp', 'jpg', 'png']
  },
  { 
    id: 3,
    title: "Tazas, Cojines y Tomatodos", 
    subtitle: "Obsequios para toda fecha y ocasión",
    formats: ['webp', 'jpg', 'png']
  },
  { 
    id: 4,
    title: "", 
    subtitle: "",
    formats: ['webp', 'jpg', 'png']
  },
];

// ✅ FUNCIÓN CORREGIDA CON RUTAS ACTUALES
const getImageSrc = (slideId: number, format: string = 'webp', device: 'desktop' | 'mobile' = 'desktop') => {
  return `/sliders/slider${slideId}-${device}.${format}`;
};

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [mounted]);

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6">
        
        {/* ✅ SLIDER COMPLETAMENTE RESPONSIVE */}
        <section className="relative w-full h-[250px] xs:h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-b-2xl shadow-xl bg-gray-100">
          <div className="flex transition-transform duration-1000 ease-in-out w-full h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
            {SLIDES.map((slide, i) => (
              <div key={slide.id} className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
                {/* ✅ IMAGEN RESPONSIVE PARA TODOS LOS DISPOSITIVOS */}
                <Image 
                  src={getImageSrc(slide.id, 'webp', isMobile ? 'mobile' : 'desktop')}
                  alt={slide.title || `Slide ${slide.id}`}
                  width={1200}
                  height={400}
                  className="object-contain w-full h-full"
                  priority={i === 0}
                  unoptimized={true}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const currentSrc = target.src;
                    
                    if (currentSrc.includes('.webp')) {
                      target.src = getImageSrc(slide.id, 'jpg', isMobile ? 'mobile' : 'desktop');
                    } 
                    else if (currentSrc.includes('.jpg')) {
                      target.src = getImageSrc(slide.id, 'png', isMobile ? 'mobile' : 'desktop');
                    }
                    else {
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add('bg-gradient-to-br', 'from-blue-400', 'to-purple-500');
                      }
                    }
                  }}
                />
                
                {slide.title && (
                  <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white px-3 sm:px-4 text-center">
                    <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold max-w-3xl leading-tight drop-shadow-md">
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className="mt-1 sm:mt-2 text-xs xs:text-sm sm:text-base md:text-lg max-w-xl drop-shadow-md">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5 z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all border border-white/20 ${
                  i === current 
                    ? "bg-white scale-110" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Sección Botón Catálogo */}
        <section className="max-w-4xl mx-auto px-3 sm:px-4 w-full">
          <div className="grid grid-cols-1 justify-items-center">
            <Link 
              href="/catalogo" 
              className="bg-white/20 backdrop-blur-md text-white py-2 sm:py-2.5 px-5 sm:px-6 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300 text-sm sm:text-base font-semibold min-w-[140px] sm:min-w-[160px] text-center border border-white/25 hover:scale-105"
            >
              Ver Catálogo
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}