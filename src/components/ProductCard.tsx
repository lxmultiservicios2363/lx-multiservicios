// src/components/ProductCard.tsx - COMPLETAMENTE OPTIMIZADO PARA MÓVIL
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  id: string;
  nombre: string;
  precio: number;
  tallas: string[];
  stockBySize: Record<string, number>;
  images: string[];
};

export default function ProductCard({ id, nombre, precio, tallas, stockBySize, images }: Props) {
  const { addItem } = useCart();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => setIndex(i => (i + 1) % images.length), 4000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [images.length]);

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setIndex(i => (i + 1) % images.length);

  const addWithTalla = (talla: string) => {
    const available = stockBySize[talla] ?? 0;
    if (available <= 0) return alert("Agotado en esa talla");
    addItem({ 
      id: `${id}-${talla}`, 
      productId: id,
      talla, 
      name: nombre, 
      price: precio, 
      quantity: 1, 
      image: images[0] 
    });
    alert("Agregado al carrito");
  };

  // ✅ FUNCIÓN PARA FORMATEAR PRECIO
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-xs sm:shadow dark:shadow-gray-700/20 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md sm:hover:shadow-lg dark:hover:shadow-gray-600/30 hover:scale-[1.02]">
      {/* ✅ CONTENEDOR DE IMAGEN OPTIMIZADO */}
      <div className="relative w-full aspect-square">
        <Image 
          src={images[index] ?? "/images/placeholder.png"} 
          alt={nombre} 
          fill 
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          loading="lazy"
        />
        
        {/* ✅ CONTROLES DE IMAGEN OPTIMIZADOS */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prev} 
              className="absolute left-1 xs:left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-colors duration-200"
            >
              <ChevronLeft size={14} className="xs:w-4 xs:h-4" />
            </button>
            <button 
              onClick={next} 
              className="absolute right-1 xs:right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-colors duration-200"
            >
              <ChevronRight size={14} className="xs:w-4 xs:h-4" />
            </button>
            
            {/* ✅ INDICADORES DE IMAGEN OPTIMIZADOS */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === index 
                      ? "bg-white scale-110" 
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ✅ CONTENIDO OPTIMIZADO PARA MÓVIL */}
      <div className="p-2 xs:p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 xs:space-y-3">
        <div className="space-y-1 xs:space-y-2">
          <h3 className="font-semibold text-sm xs:text-base dark:text-white line-clamp-2 leading-tight">
            {nombre}
          </h3>
          <p className="font-bold text-base xs:text-lg text-blue-600 dark:text-blue-400">
            {formatPrice(precio)}
          </p>
        </div>

        {/* ✅ TALLAS OPTIMIZADAS */}
        <div className="space-y-1 xs:space-y-2">
          <div className="text-xs xs:text-sm font-medium dark:text-gray-300">Tallas disponibles:</div>
          <div className="flex gap-1 xs:gap-1.5 flex-wrap">
            {tallas.map(t => {
              const stock = stockBySize[t] ?? 0;
              const isAvailable = stock > 0;
              
              return (
                <button
                  key={t}
                  onClick={() => addWithTalla(t)}
                  disabled={!isAvailable}
                  className={`px-2 xs:px-2.5 py-1 xs:py-1.5 rounded text-[10px] xs:text-xs font-medium transition-all duration-200 min-w-[35px] xs:min-w-[40px] ${
                    isAvailable
                      ? "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-500 hover:scale-105"
                      : "bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60"
                  }`}
                >
                  {t}
                  <span className={`block text-[8px] xs:text-[9px] mt-0.5 ${
                    isAvailable 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-500 dark:text-red-400"
                  }`}>
                    {isAvailable ? stock : "Agot."}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ✅ BOTÓN RÁPIDO AÑADIR AL CARRITO */}
        {tallas.length > 0 && (
          <button
            onClick={() => {
              const availableTalla = tallas.find(t => (stockBySize[t] ?? 0) > 0);
              if (availableTalla) {
                addWithTalla(availableTalla);
              } else {
                alert("Producto agotado en todas las tallas");
              }
            }}
            disabled={!tallas.some(t => (stockBySize[t] ?? 0) > 0)}
            className={`w-full py-1.5 xs:py-2 rounded text-xs xs:text-sm font-medium transition-all duration-200 ${
              tallas.some(t => (stockBySize[t] ?? 0) > 0)
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-sm active:scale-95"
                : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            {tallas.some(t => (stockBySize[t] ?? 0) > 0) ? "Añadir al Carrito" : "Producto Agotado"}
          </button>
        )}
      </div>
    </article>
  );
}