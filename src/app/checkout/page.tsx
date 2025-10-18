"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clearCart, total } = useCart();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferReference, setTransferReference] = useState("");

  // Detectar modo oscuro del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleConfirmOrder = () => {
    if (items.length === 0) {
      alert("Tu carrito está vacío 😅");
      return;
    }

    if (!paymentConfirmed) {
      alert("❌ Primero debes confirmar el pago de la transferencia");
      return;
    }

    if (!transferAmount || !transferReference) {
      alert("❌ Completa todos los datos de la transferencia");
      return;
    }

    const actualAmount = parseFloat(transferAmount);
    if (actualAmount < total) {
      alert(`❌ El monto transferido ($${actualAmount.toFixed(2)}) es menor al total ($${total.toFixed(2)})`);
      return;
    }

    // Generar comprobante automático para WhatsApp
    const orderNumber = `ORD-${Date.now()}`;
    const orderDate = new Date().toLocaleString('es-ES');
    
    const message = `✅ *COMPROBANTE DE PEDIDO CONFIRMADO* ✅%0A%0A` +
      `📋 *Número de Orden:* ${orderNumber}%0A` +
      `📅 *Fecha:* ${orderDate}%0A` +
      `💳 *Estado:* PAGADO%0A%0A` +
      `🧾 *DETALLE DEL PEDIDO:*%0A${items
        .map(
          (item) =>
            `📦 ${item.name}%0A` +
            `   • Talla: ${item.talla}%0A` +
            `   • Cantidad: ${item.quantity}%0A` +
            `   • Precio: $${(item.price * item.quantity).toFixed(2)}%0A`
        )
        .join("%0A")}%0A%0A` +
      `💰 *INFORMACIÓN DE PAGO:*%0A` +
      `   • Total Pedido: $${total.toFixed(2)}%0A` +
      `   • Monto Transferido: $${transferAmount}%0A` +
      `   • Referencia: ${transferReference}%0A` +
      `   • Fecha Pago: ${orderDate}%0A%0A` +
      `👤 *DATOS DEL CLIENTE:*%0A` +
      `   (Los datos se completarán cuando el cliente envíe el mensaje)%0A%0A` +
      `🚚 *PROCESO:*%0A` +
      `   • Pedido confirmado y en preparación%0A` +
      `   • Tiempo de entrega: 24-48 horas%0A` +
      `   • Te contactaremos para coordinar entrega%0A%0A` +
      `📞 *CONTACTO:*%0A` +
      `   L & X MULTISERVICIOS%0A` +
      `   WhatsApp: +593 98 738 4110`;

    const phone = "593987384110";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    // Limpiar carrito después de confirmación exitosa
    clearCart();
    setPaymentConfirmed(false);
    setTransferAmount("");
    setTransferReference("");
    
    alert("🎉 ¡Pedido confirmado! Se ha generado el comprobante automáticamente.");
    router.push("/");
  };

  const handlePaymentConfirmation = () => {
    if (!transferAmount || !transferReference) {
      alert("❌ Completa el monto y la referencia de transferencia");
      return;
    }

    const actualAmount = parseFloat(transferAmount);
    if (actualAmount < total) {
      alert(`❌ El monto transferido ($${actualAmount.toFixed(2)}) es menor al total ($${total.toFixed(2)})`);
      return;
    }

    setPaymentConfirmed(true);
    alert("✅ Pago confirmado correctamente. Ahora puedes finalizar la compra.");
  };

  const themeClasses = darkMode 
    ? "bg-gray-900 text-white" 
    : "bg-gray-50 text-gray-900";

  const cardClasses = darkMode 
    ? "bg-gray-800 text-white border-gray-700" 
    : "bg-white text-gray-900 border-gray-200";

  const inputClasses = darkMode 
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500";

  const buttonPrimaryClasses = darkMode 
    ? "bg-blue-600 hover:bg-blue-700 text-white" 
    : "bg-blue-600 hover:bg-blue-700 text-white";

  const buttonSuccessClasses = darkMode 
    ? "bg-green-600 hover:bg-green-700 text-white" 
    : "bg-green-600 hover:bg-green-700 text-white";

  const buttonDangerClasses = darkMode 
    ? "bg-red-600 hover:bg-red-700 text-white" 
    : "bg-red-600 hover:bg-red-700 text-white";

  return (
    <main className={`min-h-screen pt-32 pb-8 px-4 transition-colors duration-300 ${themeClasses}`}>
      <div className={`max-w-6xl mx-auto shadow-lg rounded-2xl p-6 sm:p-8 border transition-colors duration-300 ${cardClasses}`}>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">
          Finalizar Compra
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="mb-6 text-lg">Tu carrito está vacío.</p>
            <button 
              onClick={() => router.push("/catalogo")}
              className={`px-6 py-3 rounded-lg transition-colors font-medium ${buttonPrimaryClasses}`}
            >
              Ir al Catálogo
            </button>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="overflow-x-auto mb-8">
              <div className="min-w-full">
                <div className={`rounded-lg p-4 mb-4 grid grid-cols-2 sm:grid-cols-5 gap-4 font-semibold ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-900'}`}>
                  <div>Producto</div>
                  <div className="text-center">Talla</div>
                  <div className="text-center">Cantidad</div>
                  <div className="text-center">Precio</div>
                  <div className="text-center">Subtotal</div>
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image ?? "/images/placeholder.png"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-sm sm:text-base">{item.name}</span>
                      </div>
                      <div className="text-center text-sm sm:text-base">{item.talla}</div>
                      <div className="text-center text-sm sm:text-base">{item.quantity}</div>
                      <div className="text-center text-sm sm:text-base">${item.price.toFixed(2)}</div>
                      <div className="text-center font-semibold text-sm sm:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="text-right text-xl font-semibold mb-8 border-t pt-4">
              Total a pagar:{" "}
              <span className="text-blue-600 text-2xl">${total.toFixed(2)}</span>
            </div>

            {/* Información de pago - NUEVA ESTRUCTURA */}
            <div className="space-y-8 mb-8">
              {/* Información bancaria ARRIBA */}
              <div className={`rounded-xl p-6 ${darkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
                <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
                  Datos para Transferencia
                </h2>
                <div className="space-y-3">
                  <div><strong>Banco:</strong> Banco Guayaquil</div>
                  <div><strong>Tipo de cuenta:</strong> Ahorros</div>
                  <div><strong>Número de cuenta:</strong> 0041529712</div>
                  <div><strong>Nombre:</strong> Luis Enrique Reina Mesa</div>
                  <div><strong>Cédula:</strong> 1762373601</div>
                  <div><strong>Email:</strong> lxmultiservicios@gmail.com</div>
                </div>
                <p className={`mt-6 text-sm p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                  ✅ Una vez realizada la transferencia, envía el comprobante al 
                  <strong> WhatsApp +593 98 738 4110</strong> para confirmar tu pedido.
                </p>
              </div>

              {/* QR DEBAJO */}
              <div className="flex justify-center">
                <div className={`border-2 rounded-xl p-4 max-w-xs ${darkMode ? 'border-blue-700 bg-gray-800' : 'border-blue-200 bg-gray-50'}`}>
                  <Image
                    src="/images/qr.png"
                    alt="Código QR Banco Guayaquil"
                    width={280}
                    height={280}
                    className="rounded-lg"
                    priority
                  />
                  <p className="text-center text-sm mt-3">
                    Escanea el código QR para pagar
                  </p>
                </div>
              </div>

              {/* Confirmación de pago */}
              <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-600">
                  Confirmar Transferencia
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Monto Transferido *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder={`Ej: ${total.toFixed(2)}`}
                      className={`w-full p-3 border rounded-lg ${inputClasses}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Número de Referencia *
                    </label>
                    <input
                      type="text"
                      value={transferReference}
                      onChange={(e) => setTransferReference(e.target.value)}
                      placeholder="Número de transacción"
                      className={`w-full p-3 border rounded-lg ${inputClasses}`}
                    />
                  </div>
                </div>
                <button
                  onClick={handlePaymentConfirmation}
                  disabled={paymentConfirmed}
                  className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                    paymentConfirmed 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : buttonSuccessClasses
                  }`}
                >
                  {paymentConfirmed ? '✅ Pago Confirmado' : 'Confirmar Pago'}
                </button>
                {paymentConfirmed && (
                  <p className="text-green-600 mt-2 text-sm">
                    ✅ Pago verificado correctamente. Ahora puedes finalizar la compra.
                  </p>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => router.push("/catalogo")}
                className={`px-6 py-3 border rounded-lg transition-colors font-medium ${
                  darkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Seguir Comprando
              </button>
              <button
                onClick={handleConfirmOrder}
                disabled={!paymentConfirmed}
                className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                  !paymentConfirmed 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : buttonSuccessClasses
                }`}
              >
                {paymentConfirmed ? '✅ Finalizar Compra' : 'Complete el pago primero'}
              </button>
              <button
                onClick={clearCart}
                className={`px-6 py-3 rounded-lg transition-colors font-medium ${buttonDangerClasses}`}
              >
                Vaciar Carrito
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}