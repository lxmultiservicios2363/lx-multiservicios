// src/app/page.tsx - OPTIMIZADO PARA TODOS LOS DISPOSITIVOS
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

  if (!mounted) return <div className="min-h-screen bg-white dark:bg-gray-900" />;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Slider - OPTIMIZADO RESPONSIVE */}
      <section className="relative h-[40vh] sm:h-[50vh] md:h-[420px] overflow-hidden">
        <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {SLIDES.map((s, i) => (
            <div key={i} className="relative w-full h-[40vh] sm:h-[50vh] md:h-[420px] flex-shrink-0">
              <Image 
                src={s.src} 
                alt={s.title || "slide"} 
                fill 
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white px-4 text-center">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold max-w-4xl leading-tight">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base md:text-xl max-w-2xl">
                  {s.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination dots - MEJORADO */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                i === current 
                  ? "bg-white dark:bg-gray-300 scale-125" 
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Botón ver catálogo - CENTRADO Y MEJORADO */}
      <div className="max-w-6xl mx-auto px-4 mt-6 sm:mt-8 flex justify-center">
        <Link 
          href="/catalogo" 
          className="bg-blue-600 dark:bg-blue-700 text-white py-3 px-6 sm:py-2 sm:px-4 rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 text-base sm:text-sm font-semibold min-w-[140px] text-center"
        >
          Ver Catálogo
        </Link>
      </div>

      {/* Espacio para futuras secciones */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Aquí puedes agregar más secciones (servicios, contacto, etc.) */}
      </div>

    </main>
  );
}