// src/lib/products.ts
export type Product = {
  id: string;
  slug: string; // folder under /public/catalogo/
  category: string; // folder/category name
  name: string;
  price: number;
  stock: number;
  sizes: string[]; // ["M","L","XL"] or ["11Oz"] or ["40x40cm"]
  images: string[]; // urls under /catalogo/<slug>/
};

export const PRODUCTS: Product[] = [
  // ======================
  // 👕 ROPA - TALLAS M, L, XL
  // ======================
  {
    id: "sueter-hombre-1",
    slug: "sueter-hombre",
    category: "sueter-hombre",
    name: "Suéter de Hombre",
    price: 12.00, // ✅ PRECIO CORREGIDO
    stock: 10,
    sizes: ["M", "L", "XL"], // ✅ TALLAS COMPLETAS
    images: ["/catalogo/sueter-hombre/1.webp", "/catalogo/sueter-hombre/2.webp"],
  },
  {
    id: "sueter-mujer-1",
    slug: "sueter-mujer",
    category: "sueter-mujer",
    name: "Suéter de Mujer",
    price: 8.00, // ✅ PRECIO CORREGIDO
    stock: 12,
    sizes: ["M", "L", "XL"], // ✅ TALLAS COMPLETAS
    images: ["/catalogo/sueter-mujer/1.webp"],
  },
  {
    id: "camiseta-hombre-1",
    slug: "camiseta-hombre",
    category: "camiseta-hombre",
    name: "Camiseta de Hombre",
    price: 5.00, // ✅ PRECIO CORREGIDO
    stock: 15,
    sizes: ["M", "L", "XL"], // ✅ TALLAS COMPLETAS
    images: ["/catalogo/camiseta-hombre/1.webp", "/catalogo/camiseta-hombre/2.webp"],
  },
  {
    id: "camiseta-mujer-1",
    slug: "camiseta-mujer",
    category: "camiseta-mujer",
    name: "Camiseta de Mujer",
    price: 5.00, // ✅ PRECIO CORREGIDO
    stock: 12,
    sizes: ["M", "L", "XL"], // ✅ TALLAS COMPLETAS
    images: ["/catalogo/camiseta-mujer/1.webp"],
  },
  {
    id: "buso-1",
    slug: "busos-estampados",
    category: "busos-estampados",
    name: "Busos Estampados",
    price: 10.00, // ✅ PRECIO CORREGIDO
    stock: 8,
    sizes: ["M", "L", "XL"], // ✅ TALLAS COMPLETAS
    images: ["/catalogo/busos-estampados/1.webp", "/catalogo/busos-estampados/2.webp"],
  },
  {
    id: "conjunto-1",
    slug: "ternos-estampados",
    category: "ternos-estampados",
    name: "Conjuntos Estampados", // ✅ NOMBRE CORREGIDO
    price: 22.00, // ✅ PRECIO CORREGIDO
    stock: 4,
    sizes: ["M", "L", "XL"], // ✅ TALLAS COMPLETAS
    images: ["/catalogo/ternos-estampados/1.webp"],
  },

  // ======================
  // ☕ TAZAS - MEDIDA 11Oz
  // ======================
  {
    id: "taza-personalizada-1",
    slug: "tazas-personalizadas",
    category: "tazas-personalizadas",
    name: "Tazas Personalizadas",
    price: 3.50, // ✅ PRECIO CORREGIDO
    stock: 50,
    sizes: ["11Oz"], // ✅ MEDIDA CORREGIDA
    images: ["/catalogo/tazas-personalizadas/1.webp"],
  },
  {
    id: "taza-sublimada-1",
    slug: "tazas-sublimadas",
    category: "tazas-sublimadas",
    name: "Tazas Sublimadas",
    price: 2.50, // ✅ PRECIO CORREGIDO
    stock: 60,
    sizes: ["11Oz"], // ✅ MEDIDA CORREGIDA
    images: ["/catalogo/tazas-sublimadas/1.webp"],
  },

  // ======================
  // 🏠 OTROS PRODUCTOS
  // ======================
  {
    id: "cojin-1",
    slug: "cojines-sublimados",
    category: "cojines-sublimados",
    name: "Cojines Sublimados",
    price: 3.00, // ✅ PRECIO CORREGIDO
    stock: 20,
    sizes: ["40x40cm"], // ✅ MEDIDA ESPECÍFICA
    images: ["/catalogo/cojines-sublimados/1.webp"],
  },
  {
    id: "tomatodo-1",
    slug: "tomatodos-personalizados",
    category: "tomatodos-personalizados",
    name: "Tomatodos Personalizados",
    price: 3.50, // ✅ PRECIO CORREGIDO
    stock: 25,
    sizes: ["500ml"], // ✅ MEDIDA ESPECÍFICA
    images: ["/catalogo/tomatodos-personalizados/1.webp"],
  },
];