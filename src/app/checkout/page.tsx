// src/app/checkout/page.tsx - SIN PAYPAL
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "../../components/CartContext";
import { FaWhatsapp, FaCopy, FaCheck, FaQrcode } from "react-icons/fa";

const BANK_INFO = {
  nombre: "Luis Enrique Reina Mesa",
  banco: "Banco Guayaquil", 
  tipo: "Cuenta de Ahorros",
  numero: "0041529712",
  email: "lxmultiservicios@gmail.com",
  cedula: "1762373601",
  telefono: "+593987384110"
};

// ✅ QR OFICIAL DEL BANCO GUAYAQUIL
const BANK_QR_URL = "/images/qr.png";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Función para copiar datos bancarios
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ FUNCIÓN MEJORADA PARA WHATSAPP
  const openWhatsApp = () => {
    const productList = items.map(item => 
      `• ${item.name} - ${item.quantity} x $${item.price}`
    ).join('%0A');
    
    const message = `¡Hola! He realizado una transferencia bancaria.%0A%0A📦 *Mi Pedido:*%0A${productList}%0A%0A💰 *Monto Total:* $${total.toFixed(2)}%0A%0A📋 *Datos de la Transferencia:*%0A- Banco: ${BANK_INFO.banco}%0A- Cuenta: ${BANK_INFO.numero}%0A- Titular: ${BANK_INFO.nombre}%0A%0AAdjunto el comprobante de transferencia.`;
    
    window.open(`https://wa.me/${BANK_INFO.telefono}?text=${message}`, '_blank');
  };

  // ✅ FUNCIÓN PARA CONFIRMAR PAGO
  const confirmPayment = () => {
    if (confirm('¿Has realizado el pago y enviado el comprobante por WhatsApp?')) {
      openWhatsApp(); // Abre WhatsApp para enviar comprobante
      clearCart();
      alert('¡Gracias por tu compra! Hemos registrado tu pedido. Por favor envía el comprobante por WhatsApp.');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  };

  if (!items || items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Agrega algunos productos para continuar con la compra</p>
          <a 
            href="/catalogo" 
            className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Ir al Catálogo
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Finalizar Compra</h1>
          <p className="text-gray-600 dark:text-gray-300">Revisa tu pedido y completa tu transferencia bancaria</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Columna izquierda - Resumen del pedido */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Resumen del Pedido</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                    <Image
                      src={item.image ?? "/images/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Talla: {item.talla}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">${item.price.toFixed(2)} c/u</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Columna derecha - Transferencia Bancaria */}
          <div className="space-y-6">
            {/* Transferencia Bancaria */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Transferencia Bancaria</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Banco:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{BANK_INFO.banco}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Tipo de cuenta:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{BANK_INFO.tipo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Número de cuenta:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{BANK_INFO.numero}</span>
                    <button
                      onClick={() => copyToClipboard(BANK_INFO.numero)}
                      className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Copiar número de cuenta"
                    >
                      {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Titular:</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-right">{BANK_INFO.nombre}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Cédula:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{BANK_INFO.cedula}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Email:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{BANK_INFO.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Teléfono:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{BANK_INFO.telefono}</span>
                </div>
              </div>

              {!confirmed ? (
                <button
                  onClick={() => setConfirmed(true)}
                  className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors touch-target flex items-center justify-center gap-2"
                >
                  <FaQrcode size={20} />
                  Mostrar QR Oficial del Banco
                </button>
              ) : (
                <div className="space-y-4">
                  {/* ✅ QR OFICIAL DEL BANCO */}
                  <div className="text-center">
                    <div className="relative mx-auto w-64 h-64 border-2 border-blue-500 dark:border-blue-400 rounded-lg p-2 bg-white dark:bg-gray-700">
                      <Image
                        src={BANK_QR_URL}
                        alt="QR Oficial del Banco Guayaquil para transferencias"
                        fill
                        className="object-contain"
                        sizes="256px"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                      <strong>QR Oficial de Banco Guayaquil</strong>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Escanea con tu app bancaria para transferir <strong>${total.toFixed(2)}</strong>
                    </p>
                  </div>

                  {/* Acciones después del pago */}
                  <div className="space-y-3">
                    <button
                      onClick={openWhatsApp}
                      className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 touch-target"
                    >
                      <FaWhatsapp size={20} />
                      Enviar comprobante por WhatsApp
                    </button>
                    
                    <button
                      onClick={confirmPayment}
                      className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors touch-target"
                    >
                      ✅ Ya realicé el pago
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ SECCIÓN ELIMINADA: PayPal Demo */}
            {/* La sección de PayPal ha sido completamente removida */}
          </div>
        </div>
      </div>
    </main>
  );
}