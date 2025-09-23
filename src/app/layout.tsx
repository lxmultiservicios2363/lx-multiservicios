// src/app/layout.tsx
import "./globals.css"; // Path corregido
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

interface RootLayoutProps {
  children: React.ReactNode;
  pageTitle?: string; // Para poder cambiar el título dinámicamente
}

export default function RootLayout({ children, pageTitle }: RootLayoutProps) {
  const title = pageTitle ? `${pageTitle} - L & X Multiservicios` : "L & X Multiservicios";

  return (
    <html lang="es">
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Tienda online de L & X Multiservicios: ropa, sublimados y servicios técnicos" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Ropa, sublimados, soporte técnico y más." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:type" content="website" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="bg-gray-100 relative">
        {children}

        {/* Botones flotantes de redes sociales */}
        <div className="fixed bottom-6 left-6 flex flex-col gap-4 z-50">
          <a
            href="https://wa.me/593987384110?text=Hola,%20quiero%20información%20sobre%20sus%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            title="WhatsApp"
          >
            <FaWhatsapp className="text-xl" />
          </a>
          <a
            href="https://www.facebook.com/lxmultiserv"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            title="Facebook"
          >
            <FaFacebook className="text-xl" />
          </a>
          <a
            href="https://www.instagram.com/TU_INSTAGRAM"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            title="Instagram"
          >
            <FaInstagram className="text-xl" />
          </a>
        </div>
      </body>
    </html>
  );
}
