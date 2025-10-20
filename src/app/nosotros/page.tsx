"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen pt-28 sm:pt-32 md:pt-36 pb-12 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-700 dark:text-purple-300 mb-4 font-serif">
            Sobre L & X Multiservicios
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tu tienda de confianza para suéteres, busos, camisetas y productos personalizados de la más alta calidad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          
          {/* HISTORIA */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-100 dark:border-purple-900">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">📖</span>
              </div>
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">Nuestra Historia</h2>
            </div>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">
                <strong>L & X Multiservicios</strong> nació con la visión de ofrecer productos de calidad 
                a precios accesibles para toda la familia. Comenzamos como un pequeño emprendimiento 
                y gracias a la confianza de nuestros clientes, hemos crecido hasta convertirnos en 
                tu tienda de confianza.
              </p>
              
              <p className="leading-relaxed">
                Nos especializamos en <strong>suéteres tejidos</strong>, <strong>busos y sudaderas</strong>, 
                <strong> camisetas</strong>, y una variedad de productos personalizados como 
                <strong> tazas, cojines y tomatodos</strong>.
              </p>
              
              <p className="leading-relaxed">
                Cada producto es seleccionado cuidadosamente para garantizar la mejor calidad 
                y satisfacción total de nuestros clientes.
              </p>
            </div>
          </div>

          {/* MISIÓN Y VISIÓN */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🎯</span>
                <h3 className="text-xl font-bold">Nuestra Misión</h3>
              </div>
              <p className="leading-relaxed opacity-90">
                Ofrecer productos de calidad excepcional que superen las expectativas 
                de nuestros clientes, brindando una experiencia de compra única con 
                atención personalizada y precios competitivos.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🌟</span>
                <h3 className="text-xl font-bold">Nuestra Visión</h3>
              </div>
              <p className="leading-relaxed opacity-90">
                Ser la tienda líder en productos personalizados y ropa de calidad, 
                reconocida por nuestra innovación, compromiso con el cliente y 
                contribución positiva a la comunidad.
              </p>
            </div>
          </div>
        </div>

        {/* VALORES */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-100 dark:border-purple-900 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-700 dark:text-purple-300 mb-8 sm:mb-12 font-serif">
            Nuestros Valores
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "💎", title: "Calidad", desc: "Productos premium que duran" },
              { icon: "🤝", title: "Confianza", desc: "Relaciones duraderas con clientes" },
              { icon: "🚀", title: "Innovación", desc: "Siempre a la vanguardia" },
              { icon: "❤️", title: "Pasión", desc: "Amor por lo que hacemos" }
            ].map((valor, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-purple-700 rounded-xl border border-purple-200 dark:border-purple-600 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-3">{valor.icon}</div>
                <h3 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-2">{valor.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">¿Listo para Comprar?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Descubre nuestra amplia variedad de productos y vive la experiencia L & X Multiservicios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/catalogo" 
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Ver Catálogo
              </Link>
              <Link 
                href="/contacto" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Contactarnos
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}