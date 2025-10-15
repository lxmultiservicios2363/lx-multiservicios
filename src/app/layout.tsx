import "./globals.css";
import { Providers } from "@/components/Providers";
import WhatsAppChat from "@/components/WhatsAppChat"; // ✅ NUEVA IMPORTACIÓN

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
        <Providers>{children}</Providers>
        <WhatsAppChat /> {/* ✅ COMPONENTE AGREGADO */}
      </body>
    </html>
  );
}