"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: ""
        });
      }, 3000);
    }, 1500);
  };

  const ContactForm = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">✅</span>
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">¡Mensaje Enviado!</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Gracias por contactarnos. Te responderemos a la brevedad.
          </p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              placeholder="+593 98 123 4567"
            />
          </div>

          <div>
            <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Asunto *
            </label>
            <select
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            >
              <option value="">Selecciona un asunto</option>
              <option value="consulta">Consulta general</option>
              <option value="pedido">Información de pedido</option>
              <option value="producto">Información de producto</option>
              <option value="personalizado">Productos personalizados</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Mensaje *
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 resize-vertical"
            placeholder="Cuéntanos en qué podemos ayudarte..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enviando...
            </div>
          ) : (
            '📤 Enviar Mensaje'
          )}
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          * Campos obligatorios. Te contactaremos dentro de las 24 horas.
        </p>
      </form>
    );
  };

  return (
    <main className="min-h-screen pt-28 sm:pt-32 md:pt-36 pb-12 px-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-300 mb-4 font-serif">
            Contáctanos
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Escríbenos y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          
          {/* FORMULARIO */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-100 dark:border-blue-900">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">
              Envíanos un Mensaje
            </h2>
            <ContactForm />
          </div>

          {/* INFORMACIÓN DE CONTACTO */}
          <div className="space-y-6 sm:space-y-8">
            
            {/* INFORMACIÓN PRINCIPAL */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-100 dark:border-blue-900">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">
                Información de Contacto
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    icon: "📧",
                    title: "Email",
                    content: "lxmultiservicios@gmail.com",
                    link: "mailto:lxmultiservicios@gmail.com"
                  },
                  {
                    icon: "📞",
                    title: "Teléfono/WhatsApp",
                    content: "+593 98 738 4110",
                    link: "https://wa.me/593987384110"
                  },
                  {
                    icon: "🕒",
                    title: "Horario de Atención",
                    content: "Lunes a Domingo: 8:00 AM - 8:00 PM"
                  },
                  {
                    icon: "📍",
                    title: "Ubicación",
                    content: "Servicio a domicilio en toda la ciudad"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-700">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-700 dark:text-blue-300">{item.title}</h3>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          target={item.link.includes('http') ? '_blank' : undefined}
                          rel={item.link.includes('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REDES SOCIALES */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <h2 className="text-xl font-bold mb-4">Síguenos en Redes Sociales</h2>
              <p className="opacity-90 mb-4">
                Mantente actualizado con nuestros nuevos productos y promociones
              </p>
              <div className="flex gap-3">
                {[
                  { icon: "📱", name: "WhatsApp", link: "https://wa.me/593987384110" },
                  { icon: "👤", name: "Facebook", link: "https://facebook.com/lxmultiserv" },
                  { icon: "📷", name: "Instagram", link: "https://instagram.com/lxmultiservicios" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
                  >
                    <div className="text-lg mb-1">{social.icon}</div>
                    <div className="text-xs font-semibold">{social.name}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* BOTONES ACCIÓN */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/catalogo" 
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-center font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Ver Catálogo
              </Link>
              <Link 
                href="/nosotros" 
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg text-center font-bold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Conócenos
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}