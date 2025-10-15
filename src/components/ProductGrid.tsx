// src/components/ProductGrid.tsx - MEJORADO CON MEDIDAS Y PRECIOS
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
  category?: string; // ✅ NUEVO: Para identificar tipo de producto
};

export default function ProductGrid({ products }: { products: ProductForClient[] }) {
  const PAGE_SIZE = 9;
  const [page, setPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  
  const { addItem } = useCart();

  // ✅ FUNCIÓN MEJORADA - Maneja productos con y sin tallas
  const addToCart = (product: ProductForClient, size: string) => {
    // Determinar si es ropa (usa tallas) u otro producto (usa medidas/único)
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

  // ✅ FUNCIÓN PARA FORMATEAR PRECIOS
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // ✅ DETERMINAR TIPO DE PRODUCTO
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginated.map((product) => {
          const productType = getProductType(product);
          const hasVariants = product.sizes.length > 0;
          
          return (
            <div 
              key={product.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-700/30 p-4 flex flex-col transition-colors duration-200 hover:shadow-lg dark:hover:shadow-gray-600/40"
            >
              {/* Imagen del producto */}
              <div className="relative w-full h-48 mb-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Información del producto */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg dark:text-white mb-1">{product.title}</h2>
                {product.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
                )}
                
                {/* PRECIO MEJORADO */}
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-xl text-blue-600 dark:text-blue-400 price">
                    {formatPrice(product.price)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 5 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                      : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                  }`}>
                    {product.stock > 5 ? "Disponible" : "Últimas unidades"}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stock: {product.stock} unidades
                </p>
              </div>

              {/* Selector de tallas/medidas - SOLO SI TIENE VARIANTES */}
              {hasVariants && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {productType === "talla" ? "Selecciona talla:" : "Selecciona medida:"}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSizes(prev => ({ ...prev, [product.id]: size }));
                          addToCart(product, size);
                        }}
                        className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${
                          selectedSizes[product.id] === size
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón Añadir al Carrito - COMPORTAMIENTO INTELIGENTE */}
              <button
                onClick={() => {
                  if (hasVariants) {
                    const selectedSize = selectedSizes[product.id] || product.sizes[0];
                    addToCart(product, selectedSize);
                  } else {
                    // Productos sin variantes (como algunas tazas)
                    addToCart(product, "Único");
                  }
                }}
                disabled={product.stock === 0}
                className={`mt-4 w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                  product.stock === 0
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-lg"
                }`}
              >
                {product.stock === 0 ? "Agotado" : "Añadir al Carrito"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      {products.length > PAGE_SIZE && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 dark:text-white transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 dark:text-white transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Siguiente →
            </button>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Página {page} de {totalPages} — {products.length} producto(s)
          </div>
        </div>
      )}
    </>
  );
}