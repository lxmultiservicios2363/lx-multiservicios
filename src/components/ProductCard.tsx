// src/components/ProductCard.tsx
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
    // auto rotate every 4s
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
    // small feedback
    alert("Agregado al carrito");
  };

  return (
    <article className="bg-white rounded shadow overflow-hidden flex flex-col">
      <div className="relative w-full h-52">
        <Image src={images[index] ?? "/images/placeholder.png"} alt={nombre} fill className="object-cover" />
        {/* Controls */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold">{nombre}</h3>
          <p className="text-sm mt-1 font-bold">${precio.toFixed(2)}</p>
        </div>

        <div className="mt-3">
          <div className="text-sm mb-2">Tallas:</div>
          <div className="flex gap-2 flex-wrap">
            {tallas.map(t => {
              const stock = stockBySize[t] ?? 0;
              return (
                <button
                  key={t}
                  onClick={() => addWithTalla(t)}
                  disabled={stock <= 0}
                  className={`px-3 py-1 border rounded ${stock > 0 ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"}`}
                >
                  {t} {stock > 0 ? `(${stock})` : "(agotado)"}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}