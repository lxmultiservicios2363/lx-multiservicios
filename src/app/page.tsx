// src/app/page.tsx - CON MODO OSCURO
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
      {/* Slider */}
      <section className="relative h-[60vh] md:h-[420px] overflow-hidden">
        <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {SLIDES.map((s, i) => (
            <div key={i} className="relative w-full h-[60vh] md:h-[420px] flex-shrink-0">
              <Image src={s.src} alt={s.title || "slide"} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white px-4">
                <h2 className="text-3xl md:text-4xl font-bold">{s.title}</h2>
                <p className="mt-2 text-lg md:text-xl">{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${
                i === current 
                  ? "bg-white dark:bg-gray-300" 
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Botón ver catálogo */}
      <div className="max-w-6xl mx-auto px-4 mt-6 flex justify-end">
        <Link 
          href="/catalogo" 
          className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Ver Catálogo
        </Link>
      </div>

      {/* Aquí puedes agregar más secciones (servicios, contacto, etc.) */}

    </main>
  );
}