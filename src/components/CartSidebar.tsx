// src/components/CartSidebar.tsx - ICONO SÓLIDO, MENÚ MÁS TRANSPARENTE
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaTimes, FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  // Función para incrementar cantidad
  const incrementQuantity = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  // Función para decrementar cantidad
  const decrementQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  // Calcular total de items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating cart button - COLOR AZUL SÓLIDO ORIGINAL */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 touch-target"
        aria-label={`Abrir carrito (${totalItems} productos)`}
      >
        <FaShoppingCart size={22} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay con transparencia suave */}
      {open && (
        <div
          className="fixed inset-0 bg-black/10 z-40 animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar con MÁS TRANSPARENCIA y MENOS BLUR */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border-l border-gray-200/30 dark:border-gray-700/30 shadow-xl transform transition-transform duration-300 z-50 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header más transparente */}
        <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/20 flex justify-between items-center bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm sticky top-0">
          <div>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">Tu Carrito</h4>
            {totalItems > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {totalItems} producto{totalItems !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100/20 dark:hover:bg-gray-800/20 rounded-full transition-colors touch-target"
            aria-label="Cerrar carrito"
          >
            <FaTimes size={18} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Contenido del carrito más transparente */}
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <FaShoppingCart size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li 
                  key={item.id} 
                  className="flex gap-3 p-3 bg-gray-50/20 dark:bg-gray-800/20 rounded-lg border border-gray-200/20 dark:border-gray-700/20"
                >
                  {/* Imagen del producto */}
                  <div className="flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden border border-gray-200/30 dark:border-gray-600/30">
                    <Image 
                      src={item.image ?? "/images/placeholder.png"} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Talla: <span className="font-medium">{item.talla}</span>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(item.id, item.quantity)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200/30 dark:bg-gray-700/30 rounded-full hover:bg-gray-300/30 dark:hover:bg-gray-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-target"
                          aria-label="Reducir cantidad"
                        >
                          <FaMinus size={12} className="text-gray-700 dark:text-gray-300" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item.id, item.quantity)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200/30 dark:bg-gray-700/30 rounded-full hover:bg-gray-300/30 dark:hover:bg-gray-600/30 transition-colors touch-target"
                          aria-label="Aumentar cantidad"
                        >
                          <FaPlus size={12} className="text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>

                      {/* Botón eliminar */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50/20 dark:hover:bg-red-900/10 rounded-full transition-colors touch-target"
                        aria-label="Eliminar producto"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer más transparente */}
        {items.length > 0 && (
          <div className="border-t border-gray-200/20 dark:border-gray-700/20 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm p-4 sticky bottom-0">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Total</div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">${total.toFixed(2)}</div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 mb-3">
              <button 
                onClick={() => setOpen(false)}
                className="flex-1 py-3 px-4 border border-gray-300/30 dark:border-gray-600/30 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors touch-target"
              >
                Seguir comprando
              </button>
              <Link 
                href="/checkout" 
                className="flex-1 py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition-colors touch-target"
                onClick={() => setOpen(false)}
              >
                Finalizar compra
              </Link>
            </div>

            {/* Vaciar carrito */}
            <button 
              onClick={() => {
                if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                  clearCart();
                }
              }}
              className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors touch-target"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}