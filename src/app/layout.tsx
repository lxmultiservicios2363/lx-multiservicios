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
      <body className="font-sans antialiased h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex flex-col" suppressHydrationWarning>
        {/* Fondo nuevo con degradado llamativo */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] z-0"></div>
        
        {/* HEADER COMPLETAMENTE RESPONSIVE */}
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-700/30 via-pink-600/30 to-orange-500/30 backdrop-blur-lg z-40 shadow-2xl border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            {/* LOGO/TÍTULO - RESPONSIVE */}
            <div className="flex justify-center items-center py-2 sm:py-3 px-4">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-2xl font-serif tracking-tight text-center leading-tight">
                  L & X MULTISERVICIOS
                </h1>
              </Link>
            </div>

            {/* CONTENIDO DEL HEADER - ESTRUCTURA RESPONSIVE */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 py-2 sm:py-3 px-4">
              
              {/* BOTONES DE REDES SOCIALES - RESPONSIVE */}
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 order-2 sm:order-1">
                {[
                  { 
                    href: "https://wa.me/593987384110", 
                    bg: "bg-green-500", 
                    icon: FaWhatsapp, 
                    title: "WhatsApp",
                    hoverShadow: "hover:shadow-green-500/40"
                  },
                  { 
                    href: "https://www.facebook.com/lxmultiserv/", 
                    bg: "bg-blue-600", 
                    icon: FaFacebookF, 
                    title: "Facebook",
                    hoverShadow: "hover:shadow-blue-500/40"
                  },
                  { 
                    href: "https://www.instagram.com/lxmultiservicios/", 
                    bg: "bg-gradient-to-br from-pink-500 to-purple-600", 
                    icon: FaInstagram, 
                    title: "Instagram",
                    hoverShadow: "hover:shadow-pink-500/40"
                  },
                  { 
                    href: "https://share.google/nTQQaNipCAEk6msVY", 
                    bg: "bg-red-500", 
                    icon: FaMapMarkerAlt, 
                    title: "Ubicación",
                    hoverShadow: "hover:shadow-red-500/40"
                  }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative ${social.bg} rounded-full flex items-center justify-center text-white shadow-lg sm:shadow-xl hover:shadow-2xl ${social.hoverShadow} transition-all duration-300 hover:scale-105 active:scale-95
                        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                      `}
                      title={social.title}
                    >
                      <IconComponent 
                        className="group-hover:scale-110 transition-transform duration-300
                          w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
                        "
                      />
                      <div className={`absolute inset-0 rounded-full ${social.bg.replace('500', '400').replace('600', '500')} opacity-0 group-hover:opacity-100 group-active:opacity-0 transition-opacity duration-300`}></div>
                    </a>
                  );
                })}
              </div>

              {/* BOTONES DE NAVEGACIÓN - RESPONSIVE */}
              <nav className="flex items-center gap-2 sm:gap-3 md:gap-4 order-1 sm:order-2 mb-2 sm:mb-0">
                <a 
                  href="/catalogo" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                    px-3 py-1.5 sm:px-4 sm:py-2 
                    rounded-lg shadow-lg sm:shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 
                    transition-all duration-300 
                    hover:scale-105 active:scale-95
                    text-xs sm:text-sm font-bold 
                    border border-white/30 hover:border-white/50
                    whitespace-nowrap"
                >
                  Catálogo
                </a>
                
                {/* MENÚ CONTACTOS - MEJORADO PARA MÓVIL */}
                <div className="relative group">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                    px-3 py-1.5 sm:px-4 sm:py-2 
                    rounded-lg shadow-lg sm:shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 
                    transition-all duration-300 
                    hover:scale-105 active:scale-95
                    text-xs sm:text-sm font-bold 
                    border border-white/30 hover:border-white/50
                    flex items-center gap-1 whitespace-nowrap"
                  >
                    Contactos
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* DROPDOWN MEJORADO PARA MÓVIL */}
                  <div className="absolute top-full right-0 mt-1 sm:mt-2 
                    w-56 sm:w-64 
                    bg-white/95 dark:bg-gray-900/95 backdrop-blur-md 
                    rounded-lg sm:rounded-xl shadow-2xl border border-white/20 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 z-50
                    transform origin-top-right"
                  >
                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-purple-600 text-sm sm:text-base">📧</span>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Email</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 break-all">lxmultiservicios@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-purple-600 text-sm sm:text-base">📞</span>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Teléfono</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">+593 98 738 4110</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* ESTRUCTURA COMPLETAMENTE SEPARADA */}
        <div className="flex flex-col min-h-screen">
          {/* CONTENIDO PRINCIPAL - OCUPA TODO EL ESPACIO DISPONIBLE */}
          {/* Ajustamos el padding-top según el tamaño del header responsive */}
          <main className="flex-grow relative z-10 pt-28 sm:pt-32 md:pt-36">
            <Providers>{children}</Providers>
          </main>

          {/* FOOTER - SEPARADO Y CON SU PROPIO ESPACIO */}
          <div className="relative z-0">
            <div className="h-6 sm:h-8 bg-transparent"></div>
            <footer className="bg-gradient-to-r from-gray-900/50 via-purple-900/50 to-pink-900/50 backdrop-blur-lg text-white py-8 sm:py-12 border-t border-white/20">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white font-serif tracking-tight">L & X MULTISERVICIOS</h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-2">
                    © 2025 Todos los derechos reservados.
                  </p>
                  <p className="text-xs opacity-70">
                    Designed by: Luis Enrique Reina Mesa
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>

        {/* WHATSAPPCHAT */}
        <WhatsAppChat />
      </body>
    </html>
  );
}