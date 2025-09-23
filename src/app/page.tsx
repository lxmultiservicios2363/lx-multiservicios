"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaMapMarkerAlt, FaShoppingCart, FaTimes } from "react-icons/fa";
import QRCode from "react-qr-code";

export default function Home() {
  const slides = [
    { id: 1, img: "/producto1.jpg", text: "Ropa de calidad y sublimados personalizados", name: "Producto 1", price: 15 },
    { id: 2, img: "/producto2.jpg", text: "Soporte técnico e instalación de cámaras", name: "Producto 2", price: 25 },
    { id: 3, img: "/producto3.jpg", text: "Atención personalizada para tu negocio", name: "Producto 3", price: 20 },
    { id: 4, img: "/producto4.jpg", text: "Camisetas personalizadas para tu equipo", name: "Producto 4", price: 18 },
    { id: 5, img: "/producto5.jpg", text: "Sudaderas y hoodies de moda", name: "Producto 5", price: 22 },
    { id: 6, img: "/producto6.jpg", text: "Accesorios y complementos exclusivos", name: "Producto 6", price: 12 },
    { id: 7, img: "/producto7.jpg", text: "Regalos corporativos y personalizados", name: "Producto 7", price: 30 },
    { id: 8, img: "/producto8.jpg", text: "Mantenimiento y soporte técnico", name: "Producto 8", price: 25 },
    { id: 9, img: "/producto9.jpg", text: "Artículos promocionales para empresas", name: "Producto 9", price: 15 },
    { id: 10, img: "/producto10.jpg", text: "Uniformes corporativos", name: "Producto 10", price: 20 },
    { id: 11, img: "/producto11.jpg", text: "Camisetas deportivas personalizadas", name: "Producto 11", price: 18 },
    { id: 12, img: "/producto12.jpg", text: "Tecnología y gadgets para tu oficina", name: "Producto 12", price: 50 },
  ];

  const [current, setCurrent] = useState(0);
  const [showCatalog, setShowCatalog] = useState(false);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="flex flex-col min-h-screen items-center justify-start bg-gray-100 relative">
      {/* Logo */}
      <img src="/logo.png" alt="L & X Multiservicios" className="w-48 mt-8 mb-6" />

      {/* Bienvenida */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 text-center px-4 mb-6">
        Bienvenido a L & X Multiservicios
      </h1>

      {/* Slider */}
      <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-lg mb-6">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <h2 className="text-xl md:text-3xl font-semibold text-white text-center px-4">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}

        {/* Controles */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
        <a
          href="https://wa.me/593987384110?text=Hola,%20quiero%20información%20sobre%20sus%20productos"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          <FaWhatsapp /> WhatsApp
        </a>
        <button
          onClick={() => setShowCatalog(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors flex items-center gap-2"
        >
          <FaShoppingCart /> Ver más
        </button>
        <a
          href="https://share.google/TfkhXsZFxWje95EVV"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          <FaMapMarkerAlt /> Ubicación
        </a>
      </div>

      {/* Redes sociales */}
      <div className="flex gap-4 mb-8">
        <a
          href="https://www.facebook.com/lxmultiserv"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-2xl hover:text-blue-800 transition-colors"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/TU_INSTAGRAM"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 text-2xl hover:text-pink-700 transition-colors"
        >
          <FaInstagram />
        </a>
      </div>

      {/* Botón flotante de carrito */}
      <button
        onClick={() => setShowCatalog(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50"
        title="Ver carrito"
      >
        <FaShoppingCart className="text-xl" />
        {cart.length > 0 && (
          <span className="ml-1 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Modal de catálogo */}
      {showCatalog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white w-full max-w-6xl p-6 rounded shadow-lg relative overflow-auto max-h-[90vh] animate-fadeIn">
            <button
              onClick={() => setShowCatalog(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">Catálogo de Productos</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {slides.map((producto) => (
                <div key={producto.id} className="bg-gray-100 rounded shadow p-4 flex flex-col items-center">
                  <img src={producto.img} alt={producto.name} className="w-full h-48 object-cover rounded mb-2" />
                  <h3 className="font-bold text-lg mb-1">{producto.name}</h3>
                  <p className="text-gray-700 mb-2">${producto.price}</p>
                  <button
                    onClick={() => addToCart(producto)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
                  >
                    Agregar al carrito
                  </button>
                </div>
              ))}
            </div>

            {/* Carrito y Recibo */}
            {cart.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-2xl font-bold mb-4">Carrito de Compras</h3>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2 items-center">
                    <span>{item.name} x {item.quantity}</span>
                    <div className="flex gap-2">
                      <span>${item.price * item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-0.5 px-2 rounded"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>

                {/* Factura electrónica */}
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-2xl font-bold mb-2">Recibo / Factura</h3>
                  <p className="text-sm mb-2">Fecha: {new Date().toLocaleString()}</p>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between mb-1">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>
                </div>

                {/* Métodos de pago */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* PayPal */}
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => alert("Aquí se abriría la pasarela de PayPal")}
                  >
                    Pagar con PayPal
                  </button>

                  {/* Banco Guayaquil con QR */}
                  <div className="flex-1 flex flex-col items-center gap-2 bg-green-700 p-4 rounded text-white">
                    <span className="font-bold text-lg">Banco Guayaquil - Cuenta de Ahorros</span>
                    <QRCode
                      value={`Banco Guayaquil - Cuenta de Ahorros: 0041529712
Titular: Luis Enrique Reina Mesa
Cédula: 1762373601
Email: lxmultiservicios@gmail.com
Monto: $${total}`}
                      size={180}
                    />
                    <span className="text-sm mt-2 text-center">Escanea el QR para ver los datos de pago</span>
                  </div>

                  {/* Transferencia a cualquier banco */}
                  <div className="flex-1 flex flex-col items-center gap-2 bg-blue-700 p-4 rounded text-white">
                    <span className="font-bold text-lg">Transferencia a cualquier banco</span>
                    <p className="text-center text-sm">
                      Titular: Luis Enrique Reina Mesa<br />
                      Cédula: 1762373601<br />
                      Email: lxmultiservicios@gmail.com<br />
                      Cuenta de Ahorros: 0041529712
                    </p>
                    <span className="text-sm mt-2 text-center">
                      Paga desde tu banco preferido usando estos datos
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
