// src/components/WhatsAppChat.tsx - POSICIÓN ABSOLUTA GLOBAL
"use client";

import React, { useState } from "react";
import { FaWhatsapp, FaTimes, FaShippingFast, FaMoneyBillWave, FaBox, FaClock } from "react-icons/fa";

const WHATSAPP_NUMBER = "593987384110";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (optionType: string) => {
    let message = "";
    
    switch(optionType) {
      case "productos":
        message = `productos`;
        break;
      case "envios":
        message = `envios`;
        break;
      case "pagos":
        message = `pagos`;
        break;
      case "horarios":
        message = `horarios`;
        break;
      default:
        message = `Hola, necesito atención personalizada`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'fixed', zIndex: 9999 }}>
      {/* ✅ BOTÓN CON POSICIÓN ABSOLUTA GLOBAL */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 bottom-4 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 touch-target group border-2 border-white"
        aria-label="Chat de WhatsApp"
        style={{
          position: 'fixed',
          zIndex: 10000,
          left: '1rem',
          bottom: '1rem'
        }}
      >
        <FaWhatsapp size={24} />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse border border-white">
          !
        </div>
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
      </button>

      {/* ✅ OVERLAY CON POSICIÓN ABSOLUTA GLOBAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 animate-fade-in"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            zIndex: 9998,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
      )}

      {/* ✅ PANEL CON POSICIÓN ABSOLUTA GLOBAL */}
      <div
        className={`fixed left-4 bottom-20 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 flex flex-col ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
        style={{
          position: 'fixed',
          zIndex: 10000,
          left: '1rem',
          bottom: '5rem'
        }}
      >
        {/* ... (contenido igual) */}
        <div className="p-4 bg-green-500 text-white rounded-t-2xl flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <FaWhatsapp size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Asistente Automático</h3>
            <p className="text-green-100 text-sm">Respuestas instantáneas</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-green-600 rounded-full transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
            <p className="text-gray-700 dark:text-gray-200 text-sm text-center">
              ¡Selecciona una opción y recibe información automática al instante!
            </p>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <button
            onClick={() => openWhatsApp("productos")}
            className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <FaBox className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">Ver Catálogo Completo</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Precios, tallas y productos disponibles</p>
            </div>
          </button>

          <button
            onClick={() => openWhatsApp("envios")}
            className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <FaShippingFast className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">Información de Envíos</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Costos Servientrega y procedimiento</p>
            </div>
          </button>

          <button
            onClick={() => openWhatsApp("pagos")}
            className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <FaMoneyBillWave className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">Métodos de Pago</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Transferencia, QR bancario, efectivo</p>
            </div>
          </button>

          <button
            onClick={() => openWhatsApp("horarios")}
            className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <FaClock className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">Horarios y Contacto</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Ubicación y horarios de atención</p>
            </div>
          </button>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Recibirás respuesta automática al instante
          </p>
        </div>
      </div>
    </div>
  );
}