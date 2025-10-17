// src/app/page.tsx - CORREGIDO SIN WARNINGS
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
        
        <section className="relative w-full overflow-hidden rounded-b-2xl shadow-xl bg-gray-100" 
                 style={{ height: isMobile ? '160px' : '400px' }}>
          <div className="flex transition-transform duration-1000 ease-in-out w-full h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
            {SLIDES.map((slide, i) => (
              <div key={slide.id} className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
                {/* ✅ IMAGEN CORREGIDA - SIN WARNINGS */}
                <Image 
                  src={getImageSrc(slide.id, 'webp', isMobile ? 'mobile' : 'desktop')}
                  alt={slide.title || `Slide ${slide.id}`}
                  fill={true}
                  className="object-cover"
                  priority={i === 0}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const currentSrc = target.src;
                    
                    if (currentSrc.includes('.webp')) {
                      target.src = getImageSrc(slide.id, 'jpg', isMobile ? 'mobile' : 'desktop');
                    } 
                    else if (currentSrc.includes('.jpg')) {
                      target.src = getImageSrc(slide.id, 'png', isMobile ? 'mobile' : 'desktop');
                    }
                  }}
                />
                
                {slide.title && (
                  <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-3 ${
                    isMobile ? 'px-2' : 'px-4'
                  }`}>
                    <h2 className={`font-bold max-w-3xl leading-tight drop-shadow-md ${
                      isMobile ? 'text-sm' : 'text-xl md:text-2xl'
                    }`}>
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className={`mt-1 max-w-xl drop-shadow-md ${
                        isMobile ? 'text-xs mt-1' : 'text-sm md:text-base mt-2'
                      }`}>
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className={`absolute left-1/2 -translate-x-1/2 flex z-10 ${
            isMobile ? 'bottom-2 gap-1' : 'bottom-3 gap-1.5'
          }`}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all border border-white/20 ${
                  i === current ? "bg-white scale-110" : "bg-white/30 hover:bg-white/50"
                } ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
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