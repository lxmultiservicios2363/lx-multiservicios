// src/components/ProductGrid.tsx - COMPLETAMENTE OPTIMIZADO PARA MÓVIL
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";

type ProductForClient = {
  id: string;
  image: string;
  title: string;
  description?: string;
  price: number;
  stock: number;
  sizes: string[];
  category?: string;
};

export default function ProductGrid({ products }: { products: ProductForClient[] }) {
  const PAGE_SIZE = 8; // ✅ OPTIMIZADO: Mejor para grid responsive
  const [page, setPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  
  const { addItem } = useCart();

  const addToCart = (product: ProductForClient, size: string) => {
    const isClothing = product.category === "ropa" || product.sizes.some(s => 
      ["XS", "S", "M", "L", "XL", "XXL"].includes(s.toUpperCase())
    );
    
    const itemName = isClothing 
      ? `${product.title} - Talla: ${size}`
      : product.sizes.length > 1 
        ? `${product.title} - ${size}`
        : product.title;

    addItem({
      id: `${product.id}-${size}`,
      productId: product.id,
      name: itemName,
      price: product.price,
      image: product.image,
      talla: size,
      quantity: 1,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const getProductType = (product: ProductForClient) => {
    if (product.category === "ropa") return "talla";
    if (product.category === "tazas" || product.category === "accesorios") return "medida";
    if (product.sizes.some(s => ["XS", "S", "M", "L", "XL", "XXL"].includes(s.toUpperCase()))) return "talla";
    return "medida";
  };

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, page]);

  return (
    <>
      {/* ✅ GRID COMPLETAMENTE RESPONSIVE - 2 COLUMNAS MÓVIL */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {paginated.map((product) => {
          const productType = getProductType(product);
          const hasVariants = product.sizes.length > 0;
          
          return (
            <div 
              key={product.id} 
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-xs sm:shadow dark:shadow-gray-700/20 p-2 xs:p-3 sm:p-4 flex flex-col transition-all duration-200 hover:shadow-md sm:hover:shadow-lg dark:hover:shadow-gray-600/30 hover:scale-[1.02]"
            >
              {/* ✅ IMAGEN OPTIMIZADA PARA MÓVIL */}
              <div className="relative w-full aspect-square mb-2 xs:mb-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md sm:rounded-lg"
                  sizes="(max-width: 475px) 50vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  loading="lazy"
                />
              </div>

              {/* ✅ INFORMACIÓN OPTIMIZADA PARA MÓVIL */}
              <div className="flex-1 space-y-1 xs:space-y-2">
                <h2 className="font-semibold text-xs xs:text-sm sm:text-base dark:text-white line-clamp-2 leading-tight min-h-[2.5em]">
                  {product.title}
                </h2>
                
                {product.description && (
                  <p className="text-[10px] xs:text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-tight">
                    {product.description}
                  </p>
                )}
                
                {/* ✅ PRECIO Y STOCK OPTIMIZADOS */}
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm xs:text-base text-blue-600 dark:text-blue-400">
                    {formatPrice(product.price)}
                  </p>
                  <span className={`text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full ${
                    product.stock > 5 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                  }`}>
                    {product.stock > 5 ? "✓ Stock" : "⚠️ Últimas"}
                  </span>
                </div>
                
                <p className="text-[10px] xs:text-xs text-gray-500 dark:text-gray-400">
                  {product.stock} unidades
                </p>
              </div>

              {/* ✅ SELECTOR DE TALLAS/MEDIDAS OPTIMIZADO */}
              {hasVariants && (
                <div className="mt-2 xs:mt-3">
                  <p className="text-[10px] xs:text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 xs:mb-2">
                    {productType === "talla" ? "Talla:" : "Medida:"}
                  </p>
                  <div className="flex gap-1 xs:gap-1.5 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSizes(prev => ({ ...prev, [product.id]: size }));
                          addToCart(product, size);
                        }}
                        className={`px-2 xs:px-2.5 py-1 xs:py-1.5 rounded text-[10px] xs:text-xs transition-all duration-200 min-w-[30px] xs:min-w-[35px] ${
                          selectedSizes[product.id] === size
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ✅ BOTÓN AÑADIR AL CARRITO OPTIMIZADO */}
              <button
                onClick={() => {
                  if (hasVariants) {
                    const selectedSize = selectedSizes[product.id] || product.sizes[0];
                    addToCart(product, selectedSize);
                  } else {
                    addToCart(product, "Único");
                  }
                }}
                disabled={product.stock === 0}
                className={`mt-2 xs:mt-3 w-full py-1.5 xs:py-2 sm:py-2.5 rounded-md xs:rounded-lg text-[10px] xs:text-xs sm:text-sm font-medium transition-all duration-200 ${
                  product.stock === 0
                    ? "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-sm active:scale-95"
                }`}
              >
                {product.stock === 0 ? "Agotado" : "Añadir al Carrito"}
              </button>
            </div>
          );
        })}
      </div>

      {/* ✅ PAGINACIÓN OPTIMIZADA PARA MÓVIL */}
      {products.length > PAGE_SIZE && (
        <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 xs:px-4 py-1.5 xs:py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs xs:text-sm disabled:opacity-50 dark:text-white transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 xs:px-4 py-1.5 xs:py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs xs:text-sm disabled:opacity-50 dark:text-white transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Siguiente →
            </button>
          </div>

          <div className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 text-center xs:text-right">
            Página {page} de {totalPages}
          </div>
        </div>
      )}
    </>
  );
}