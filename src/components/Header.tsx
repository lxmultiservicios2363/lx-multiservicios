// src/components/Header.tsx - MANTIENE BOTONES, ELIMINA TEXTO
"use client";

import Link from "next/link";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import React from "react";

const whatsappLink = "https://wa.me/593987384110";
const mapsLink = "https://share.google/nTQQaNipCAEk6msVY";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: redes + ubicación - SIN TEXTO */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-green-500 w-10 h-10 rounded-full justify-center text-white shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-green-500/25"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center bg-blue-600 w-10 h-10 rounded-full text-white shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-blue-500/25"
            title="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center bg-pink-500 w-10 h-10 rounded-full text-white shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-pink-500/25"
            title="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href={mapsLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center bg-red-500 w-10 h-10 rounded-full text-white shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-red-500/25"
            title="Ubicación"
          >
            <FaMapMarkerAlt />
          </a>

          {/* ✅ TEXTO "L & X MULTISERVICIOS" ELIMINADO */}
        </div>

        {/* Right: navegación */}
        <nav className="flex items-center gap-4">
          <Link 
            href="/catalogo" 
            className="text-sm px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700"
          >
            Catálogo
          </Link>
          <Link 
            href="/checkout" 
            className="text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-medium shadow-lg hover:shadow-blue-600/25"
          >
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}