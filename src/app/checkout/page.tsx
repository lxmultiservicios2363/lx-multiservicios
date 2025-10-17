// src/app/page.tsx - COMPLETAMENTE OPTIMIZADO
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { src: "/slider1.png", title: "Suéteres Tejidos", subtitle: "Para Toda Ocasión" },
  { src: "/slider2.png", title: "Busos | Sudaderas | Camisetas", subtitle: "Calidad y estilo para ti" },
  { src: "/slider3.png", title: "Tazas, Cojines y Tomatodos", subtitle: "Obsequios para toda fecha y ocasión" },
  { src: "/slider4.png", title: "", subtitle: "" },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [mounted]);

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="min-h-screen">
      {/* Grid Container Principal */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        
        {/* Sección Slider */}
        <section className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-b-3xl shadow-2xl">
          <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {SLIDES.map((s, i) => (
              <div key={i} className="relative w-full h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[80vh] flex-shrink-0">
                <Image 
                  src={s.src} 
                  alt={s.title || "slide"} 
                  fill 
                  className="object-cover"
                  priority={i === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white px-3 sm:px-4 md:px-6 text-center">
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold max-w-4xl leading-tight drop-shadow-lg">
                    {s.title}
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-xl lg:text-2xl max-w-2xl drop-shadow-lg">
                    {s.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all ${
                  i === current 
                    ? "bg-white scale-125" 
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Sección Botón Catálogo */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 w-full">
          <div className="grid grid-cols-1 justify-items-center">
            <Link 
              href="/catalogo" 
              className="bg-white/20 backdrop-blur-md text-white py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-2xl hover:bg-white/30 transition-all duration-300 text-base sm:text-lg font-bold min-w-[180px] sm:min-w-[200px] text-center border border-white/30 hover:scale-105 hover:shadow-3xl"
            >
              Ver Catálogo
            </Link>
          </div>
        </section>

        {/* Espacio para futuras secciones */}
        <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 py-8 sm:py-10 md:py-12">
            {/* Aquí puedes agregar más secciones con grid responsive */}
          </div>
        </section>

      </div>
    </div>
  );
}