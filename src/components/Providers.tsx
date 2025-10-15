"use client";

import React from "react";
import { CartProvider } from "./CartContext";
import CartSidebar from "./CartSidebar";
import Header from "./Header";
import WelcomeToast from "./WelcomeToast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <div className="pt-4 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {children}
      </div>
      <CartSidebar />
      <WelcomeToast />
    </CartProvider>
  );
}