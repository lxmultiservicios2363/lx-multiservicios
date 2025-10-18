"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartSidebarHome() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante - Z-INDEX MÁXIMO */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-[9999] bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
        aria-label="Abrir carrito"
      >
        <FaShoppingCart size={20} />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {items.reduce((s, i) => s + i.quantity, 0)}
          </span>
        )}
      </button>

      {/* Fondo blur - Z-INDEX MÁXIMO */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar - Z-INDEX MÁXIMO */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform z-[9999] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h4 className="font-semibold">Tu carrito</h4>
          <button onClick={() => setOpen(false)} className="text-sm text-gray-500">
            Cerrar
          </button>
        </div>

        <div className="p-4 h-[calc(100%-160px)] overflow-auto">
          {items.length === 0 ? (
            <p className="text-sm">Carrito vacío</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 relative rounded overflow-hidden border">
                      <Image src={it.image ?? "/images/placeholder.png"} alt={it.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{it.name}</div>
                      <div className="text-xs">Talla: {it.talla}</div>
                      <div className="text-xs">Precio: ${it.price.toFixed(2)}</div>
                      <div className="text-xs mt-1">
                        Cant:
                        <input
                          type="number"
                          min={1}
                          value={it.quantity}
                          onChange={(e) => updateQuantity(it.id, Number(e.target.value))}
                          className="ml-2 w-16 p-1 border rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
                    <button onClick={() => removeItem(it.id)} className="text-xs text-red-500">
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-lg font-bold">${total.toFixed(2)}</div>
          </div>
          <div className="flex gap-2">
            <Link href="/catalogo" className="flex-1 py-2 rounded border text-center">
              Seguir comprando
            </Link>
            <Link href="/checkout" className="flex-1 py-2 rounded bg-blue-600 text-white text-center">
              Finalizar compra
            </Link>
          </div>
          {items.length > 0 && (
            <button onClick={() => clearCart()} className="mt-3 w-full text-sm text-gray-600">
              Vaciar carrito
            </button>
          )}
        </div>
      </div>
    </>
  );
}