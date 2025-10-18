"use client";

import React from "react";
import { CartProvider } from "./CartContext";
import CartSidebar from "./CartSidebar";
import WelcomeToast from "./WelcomeToast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {/* Contenido principal - SIN z-index que interfiera */}
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 relative z-0">
        {children}
      </div>
      
      {/* Componentes flotantes - FUERA del flujo principal */}
      <CartSidebar />
      <WelcomeToast />
    </CartProvider>
  );
}