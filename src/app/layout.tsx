import "./globals.css";
import { Providers } from "@/components/Providers";
import WhatsAppChat from "@/components/WhatsAppChat";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "L & X Multiservicios",
  description: "Tienda - Suéteres, busos, tazas y más",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased h-full bg-gradient-to-br from-blue-500/90 via-teal-400/90 to-cyan-300/90">
        {/* Fondo original */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-0"></div>
        
        {/* HEADER CON BOTONES DE REDES SOCIALES MEJORADOS */}
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700/20 via-teal-600/20 to-cyan-500/20 backdrop-blur-sm z-40 shadow-lg border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center py-3">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg font-serif tracking-tight text-center">
                  L & X MULTISERVICIOS
                </h1>
              </Link>
            </div>

            <div className="flex justify-between items-center py-3 px-4">
              {/* BOTONES DE REDES SOCIALES - MÁS GRANDES Y ANIMADOS */}
              <div className="flex items-center gap-4">
                {/* WhatsApp - Animación de pulso */}
                <a 
                  href="https://wa.me/593987384110" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-green-500/40 transition-all duration-500 hover:scale-110 hover:rotate-12 animate-pulse hover:animate-bounce"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 animate-ping group-hover:animate-none transition-opacity duration-300"></div>
                </a>

                {/* Facebook - Animación de rebote */}
                <a 
                  href="https://www.facebook.com/lxmultiserv/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-110 hover:-rotate-12 hover:animate-bounce"
                  title="Síguenos en Facebook"
                >
                  <FaFacebookF size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 animate-ping group-hover:animate-none transition-opacity duration-300"></div>
                </a>

                {/* Instagram - Animación de gradiente */}
                <a 
                  href="https://www.instagram.com/lxmultiservicios/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-pink-500/40 transition-all duration-500 hover:scale-110 hover:rotate-12 hover:animate-pulse"
                  title="Síguenos en Instagram"
                >
                  <FaInstagram size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 animate-ping group-hover:animate-none transition-opacity duration-300"></div>
                </a>

                {/* Ubicación - Animación de latido */}
                <a 
                  href="https://share.google/nTQQaNipCAEk6msVY" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-red-500/40 transition-all duration-500 hover:scale-110 hover:-rotate-12 hover:animate-pulse"
                  title="Ubicación"
                >
                  <FaMapMarkerAlt size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-100 animate-ping group-hover:animate-none transition-opacity duration-300"></div>
                </a>
              </div>

              <nav className="flex items-center gap-3 sm:gap-4">
                {/* BOTÓN CATÁLOGO CON DEGRADADO */}
                <a 
                  href="/catalogo" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium border border-white/20 hover:scale-105 hover:shadow-blue-500/25"
                >
                  Catálogo
                </a>
                
                {/* BOTÓN CONTACTOS CON DEGRADADO */}
                <div className="relative group">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium border border-white/20 hover:scale-105 hover:shadow-blue-500/25 flex items-center gap-1">
                    Contactos
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">📧</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Email</p>
                          <p className="text-xs text-gray-600">lxmultiservicios@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">📞</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Teléfono</p>
                          <p className="text-xs text-gray-600">+593 98 738 4110</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="relative z-10 pt-32 min-h-screen">
          <Providers>{children}</Providers>
        </main>

        {/* FOOTER */}
        <footer className="relative z-20 bg-gradient-to-r from-gray-900/20 via-teal-800/20 to-cyan-700/20 backdrop-blur-sm text-white py-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3 text-white font-serif tracking-tight">L & X MULTISERVICIOS</h3>
              <p className="text-sm opacity-90 mb-2">
                © 2025 Todos los derechos reservados.
              </p>
              <p className="text-xs opacity-70">
                Designed by: Luis Enrique Reina Mesa
              </p>
            </div>
          </div>
        </footer>

        {/* WHATSAPPCHAT */}
        <WhatsAppChat />
      </body>
    </html>
  );
}