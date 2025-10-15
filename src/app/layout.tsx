import "./globals.css";
import { Providers } from "@/components/Providers";
import WhatsAppChat from "@/components/WhatsAppChat";

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
      <body className="font-sans antialiased h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {/* Header Fijo - Optimizado */}
        <header className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50 py-3 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              L & X <span className="hidden sm:inline">MULTISERVICIOS</span>
            </h1>
            <nav className="flex gap-3 sm:gap-6">
              <a href="/catalogo" className="text-xs sm:text-sm hover:text-blue-600 transition font-medium">Catálogo</a>
              <a href="/checkout" className="text-xs sm:text-sm hover:text-blue-600 transition font-medium">Checkout</a>
            </nav>
          </div>
        </header>

        {/* Contenido Principal con espacio para header */}
        <main className="pt-16 min-h-screen">
          <Providers>{children}</Providers>
        </main>

        {/* Footer Profesional */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Información de derechos */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">L & X MULTISERVICIOS</h3>
                <p className="text-sm opacity-80">
                  © 2025 Todos los derechos reservados.
                </p>
              </div>
              
              {/* Información de contacto */}
              <div className="text-center md:text-right">
                <h4 className="font-semibold mb-3">Contáctanos</h4>
                <div className="space-y-2">
                  <p className="text-sm opacity-90">
                    📧 Email: lxmultiservicios@gmail.com
                  </p>
                  <p className="text-sm opacity-90">
                    📞 Teléfono: +593 98 738 4110
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <WhatsAppChat />
      </body>
    </html>
  );
}