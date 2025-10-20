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

  // Función para copiar texto al portapapeles
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`✅ ${fieldName} copiado al portapapeles`);
    }).catch(() => {
      alert(`❌ Error al copiar ${fieldName}`);
    });
  };

  const handleConfirmOrder = () => {
    if (items.length === 0) {
      alert("Tu carrito está vacío 😅");
      return;
    }

    if (!paymentConfirmed) {
      alert("❌ Primero debes enviar el voucher por WhatsApp para confirmar el pago");
      return;
    }

    if (!transferAmount) {
      alert("❌ Ingresa el monto transferido");
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
            `   • Precio Unitario: $${item.price.toFixed(2)}%0A` +
            `   • Subtotal: $${(item.price * item.quantity).toFixed(2)}%0A`
        )
        .join("%0A")}%0A%0A` +
      `💰 *RESUMEN DE PAGO:*%0A` +
      `   • Subtotal: $${total.toFixed(2)}%0A` +
      `   • Total Pagado: $${transferAmount}%0A` +
      `   • Fecha de Pago: ${orderDate}%0A%0A` +
      `🚚 *INFORMACIÓN DE ENTREGA:*%0A` +
      `   • Pedido confirmado y en preparación%0A` +
      `   • Tiempo de entrega: 24-48 horas%0A` +
      `   • Te contactaremos para coordinar la entrega%0A%0A` +
      `📞 *CONTACTO:*%0A` +
      `   L & X MULTISERVICIOS%0A` +
      `   WhatsApp: +593 98 738 4110%0A` +
      `   Email: lxmultiservicios@gmail.com`;

    const phone = "593987384110";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    // Limpiar carrito después de confirmación exitosa
    clearCart();
    setPaymentConfirmed(false);
    setTransferAmount("");
    
    alert("🎉 ¡Pedido confirmado! Se ha generado el comprobante automáticamente.");
    router.push("/");
  };

  const handleSendVoucher = () => {
    if (!transferAmount) {
      alert("❌ Ingresa el monto transferido antes de enviar el voucher");
      return;
    }

    const actualAmount = parseFloat(transferAmount);
    if (actualAmount < total) {
      alert(`❌ El monto transferido ($${actualAmount.toFixed(2)}) es menor al total ($${total.toFixed(2)})`);
      return;
    }

    // Mensaje para enviar voucher
    const voucherMessage = `📋 *ENVÍO DE VOUCHER - L & X MULTISERVICIOS*%0A%0A` +
      `Hola! Acabo de realizar una transferencia por mi pedido.%0A%0A` +
      `📦 *Resumen del Pedido:*%0A${items
        .map(
          (item) =>
            `• ${item.name} - Talla ${item.talla} x${item.quantity}`
        )
        .join("%0A")}%0A%0A` +
      `💰 *Monto Transferido:* $${transferAmount}%0A` +
      `📅 *Fecha:* ${new Date().toLocaleString('es-ES')}%0A%0A` +
      `Adjunto el voucher de la transferencia para su verificación.`;

    const phone = "593987384110";
    window.open(`https://wa.me/${phone}?text=${voucherMessage}`, "_blank");
    
    alert("📤 Se abrirá WhatsApp para que envíes el voucher. Una vez verificado, podrás finalizar la compra.");
  };

  const themeClasses = darkMode 
    ? "bg-gray-900 text-white" 
    : "bg-gray-50 text-gray-900";

  const cardClasses = darkMode 
    ? "bg-gray-800 text-white border-gray-700" 
    : "bg-white text-gray-900 border-gray-200";

  return (
    <main className={`min-h-screen pt-32 pb-8 px-4 transition-colors duration-300 ${themeClasses}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-purple-600">
          Finalizar Compra
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="mb-6 text-lg">Tu carrito está vacío.</p>
            <button 
              onClick={() => router.push("/catalogo")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
            >
              Ir al Catálogo
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* LADO IZQUIERDO - IMÁGENES DE PRODUCTOS MEJORADO */}
            <div className={`rounded-2xl p-6 shadow-xl ${cardClasses}`}>
              {/* Título con fondo destacado */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 mb-6 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  🛍️ Tu Pedido
                </h2>
              </div>
              
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    {/* Imágenes más grandes y legibles */}
                    <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 relative rounded-xl overflow-hidden border-2 border-purple-300 shadow-lg">
                      <Image
                        src={item.image ?? "/images/placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg sm:text-xl mb-2 text-purple-700 dark:text-purple-300">{item.name}</h3>
                      <div className="flex flex-wrap gap-3 text-sm sm:text-base">
                        <span className="bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-200 px-3 py-1 rounded-full font-semibold">
                          👕 Talla: {item.talla}
                        </span>
                        <span className="bg-pink-200 text-pink-800 dark:bg-pink-700 dark:text-pink-200 px-3 py-1 rounded-full font-semibold">
                          🔢 Cantidad: {item.quantity}
                        </span>
                        <span className="bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200 px-3 py-1 rounded-full font-semibold">
                          💰 ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Precio unitario: <span className="font-semibold">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total destacado */}
              <div className="mt-8 p-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white text-center shadow-xl">
                <div className="text-lg font-semibold opacity-90">Total a Pagar</div>
                <div className="text-4xl font-bold mt-2">${total.toFixed(2)}</div>
                <div className="text-sm opacity-80 mt-2">Incluye todos los productos</div>
              </div>
            </div>

            {/* LADO DERECHO - RECIBO Y PAGO */}
            <div className="space-y-6">
              
              {/* RECIBO DE COMPRA */}
              <div className={`rounded-2xl p-6 shadow-xl ${cardClasses}`}>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">
                  📄 Recibo de Compra
                </h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{item.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Talla: <span className="font-medium">{item.talla}</span> | 
                          Cantidad: <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Precio unitario: <span className="font-medium">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Subtotal
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Totales */}
                  <div className="space-y-3 pt-4 border-t border-gray-300 dark:border-gray-600">
                    <div className="flex justify-between text-xl">
                      <span className="font-semibold">Subtotal:</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-purple-600 pt-2 border-t border-gray-300 dark:border-gray-600">
                      <span>Total Final:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DATOS BANCARIOS */}
              <div className={`rounded-2xl p-6 shadow-xl ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">
                  🏦 Datos para Transferencia
                </h2>
                
                <div className="space-y-4">
                  {[
                    { label: "Banco y Tipo de Cuenta", value: "Banco Guayaquil - Cuenta de Ahorros" },
                    { label: "Número de cuenta", value: "0041529712" },
                    { label: "Nombre", value: "Luis Enrique Reina Mesa" },
                    { label: "Cédula", value: "1762373601" },
                    { label: "Email", value: "lxmultiservicios@gmail.com" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-purple-200 dark:border-purple-700">
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-600 dark:text-gray-300 mb-1">{item.label}</div>
                        <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{item.value}</div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-110 transition-all duration-300 ml-4"
                        title={`Copiar ${item.label}`}
                      >
                        📋
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR CODE */}
              <div className={`rounded-2xl p-6 shadow-xl text-center ${cardClasses}`}>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">
                  📱 Escanear QR para Pagar
                </h2>
                <div className="flex justify-center">
                  <div className="border-3 border-purple-400 rounded-2xl p-5 bg-white shadow-lg">
                    <Image
                      src="/images/qr.png"
                      alt="Código QR Banco Guayaquil"
                      width={220}
                      height={220}
                      className="rounded-lg"
                      priority
                    />
                  </div>
                </div>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-400 font-medium">
                  Escanea el código QR con tu app bancaria para pagar
                </p>
              </div>

              {/* CONFIRMACIÓN DE PAGO - SIMPLIFICADO */}
              <div className={`rounded-2xl p-6 shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">
                  💳 Confirmar Transferencia
                </h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Monto Transferido *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder={`Ej: ${total.toFixed(2)}`}
                    className="w-full p-4 border-2 border-purple-300 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSendVoucher}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 font-bold text-lg border-2 border-white/30 hover:shadow-blue-500/40"
                  >
                    📤 Enviar Voucher por WhatsApp
                  </button>
                  
                  <button
                    onClick={() => setPaymentConfirmed(true)}
                    disabled={paymentConfirmed}
                    className={`w-full py-3 rounded-xl transition-all duration-300 font-semibold ${
                      paymentConfirmed 
                        ? 'bg-green-500 text-white cursor-not-allowed' 
                        : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                    }`}
                  >
                    {paymentConfirmed ? '✅ Voucher Confirmado' : 'Marcar como Confirmado (Admin)'}
                  </button>
                </div>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                  📋 Después de transferir, envía el voucher por WhatsApp para confirmar tu pedido
                </p>
              </div>

              {/* BOTONES FINALES MEJORADOS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push("/catalogo")}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 font-bold text-lg border-2 border-white/30 hover:shadow-purple-500/40"
                >
                  🛒 Seguir Comprando
                </button>
                <button
                  onClick={handleConfirmOrder}
                  disabled={!paymentConfirmed}
                  className={`flex-1 py-4 rounded-xl shadow-lg transform transition-all duration-300 font-bold text-lg border-2 ${
                    !paymentConfirmed 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-white/30 hover:scale-105 hover:shadow-orange-500/40' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-white/30 hover:scale-105 hover:shadow-green-500/40'
                  }`}
                >
                  {paymentConfirmed ? '✅ Finalizar Compra' : '💳 Complete el pago'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}