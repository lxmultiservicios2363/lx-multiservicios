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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased h-full bg-gradient-to-br from-blue-500/90 via-teal-400/90 to-cyan-300/90">
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-0"></div>
        
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-700/95 via-teal-600/95 to-cyan-500/95 backdrop-blur-md z-50 shadow-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto">
            {/* ✅ NOMBRE SIN BORDE NEGRO Y SIN EFECTO BOTÓN */}
            <div className="flex justify-center items-center py-3">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md font-serif tracking-tight text-center">
                  L & X MULTISERVICIOS
                </h1>
              </Link>
            </div>

            {/* ✅ SEGUNDA FILA CON ICONOS Y NAVEGACIÓN SIN CHECKOUT */}
            <div className="flex justify-between items-center py-3 px-4">
              {/* ✅ REDES SOCIALES MÁS GRANDES Y CON ANIMACIÓN */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://wa.me/593987384110" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:bg-green-600"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
                <a 
                  href="https://www.facebook.com/lxmultiserv/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 hover:-rotate-12 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:bg-blue-700"
                  title="Síguenos en Facebook"
                >
                  <FaFacebookF size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/lxmultiservicios/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
                  title="Síguenos en Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a 
                  href="https://share.google/nTQQaNipCAEk6msVY" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 hover:-rotate-12 transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:bg-red-600"
                  title="Ubicación"
                >
                  <FaMapMarkerAlt size={18} />
                </a>
              </div>

              {/* ✅ NAVEGACIÓN SOLO CON CATÁLOGO Y CONTACTOS - SIN CHECKOUT */}
              <nav className="flex items-center gap-3 sm:gap-4">
                <a href="/catalogo" className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium border border-white/30 hover:scale-105 shadow-sm">
                  Catálogo
                </a>
                
                <div className="relative group">
                  <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium border border-white/30 hover:scale-105 shadow-sm flex items-center gap-1">
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

        <main className="relative z-10 pt-32 min-h-screen">
          <Providers>{children}</Providers>
        </main>

        <footer className="relative z-10 bg-gradient-to-r from-blue-800/95 via-teal-700/95 to-cyan-600/95 text-white py-8 backdrop-blur-sm border-t border-white/20">
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

        <WhatsAppChat />
      </body>
    </html>
  );
}