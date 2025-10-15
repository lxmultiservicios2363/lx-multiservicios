// src/components/WelcomeToast.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { FaTimes, FaStore, FaShoppingCart } from 'react-icons/fa';

export default function WelcomeToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró anteriormente
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      // Mostrar después de 1.5 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      // Auto-ocultar después de 8 segundos
      const autoHide = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('hasSeenWelcome', 'true');
      }, 8000);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoHide);
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-large dark:shadow-dark-large p-4 max-w-sm w-80">
        {/* Header del toast */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaStore className="text-white text-sm" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                ¡Bienvenido! 
                <span className="text-yellow-500">👋</span>
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                L & X Multiservicios
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <span className="sr-only">Cerrar</span>
            <FaTimes className="h-4 w-4" />
          </button>
        </div>
        
        {/* Mensaje de bienvenida */}
        <div className="mb-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Descubre nuestra colección de <strong>suéteres, busos, tazas</strong> y más productos exclusivos.
          </p>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Envíos rápidos</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Calidad premium</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-100"
            style={{
              animation: 'progress 8s linear forwards'
            }}
          />
        </div>

        <style jsx>{`
          @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}