// src/app/catalogo/[category]/page.tsx - CON CLAVES ÚNICAS
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { CATEGORIES } from "../../../lib/categories";
import { PRODUCTS } from "../../../lib/products";
import ProductGrid from "@/components/ProductGrid";

type ImgItem = {
  src: string;
  file: string;
  title?: string;
  description?: string;
};

interface Props {
  params: { category: string };
}

// server component
export default async function CategoryPage({ params }: Props) {
  const { category } = params;
  
  // check category exists in our manual list
  const catMeta = CATEGORIES.find((c) => c.slug === category);
  if (!catMeta) return notFound();

  const catPath = path.join(process.cwd(), "public", "catalogo", category);
  
  // Check if directory exists - CON MANEJO DE ERRORES
  let files: string[] = [];
  try {
    if (!fs.existsSync(catPath) || !fs.statSync(catPath).isDirectory()) {
      return notFound();
    }
    
    // read images and optional info.json
    const allFiles = fs.readdirSync(catPath).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
    // limit to 20 (as requested)
    files = allFiles.slice(0, 20);
  } catch (error) {
    console.error("Error reading directory:", error);
    return notFound();
  }

  // try to read info.json for titles/descriptions if exists
  let infoMap: Record<string, { title?: string; description?: string }> = {};
  const infoPath = path.join(catPath, "info.json");
  
  if (fs.existsSync(infoPath)) {
    try {
      const raw = fs.readFileSync(infoPath, "utf8");
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        for (const it of arr) {
          if (it.file) infoMap[it.file] = { title: it.title, description: it.description };
        }
      }
    } catch (e) {
      console.error("Error reading info.json:", e);
      // ignore parse issues but continue
    }
  }

  const images: ImgItem[] = files.map((f) => ({
    src: `/catalogo/${category}/${f}`,
    file: f,
    title: infoMap[f]?.title || "",
    description: infoMap[f]?.description || "",
  }));

  // ✅ OBTENER PRODUCTOS REALES DE LA CATEGORÍA
  const categoryProducts = PRODUCTS.filter(product => product.category === category);

  // ✅ COMBINAR IMÁGENES CON DATOS REALES - CON CLAVES ÚNICAS
  const clientData = images.map((img, idx) => {
    // Buscar producto real que coincida con la imagen
    const realProduct = categoryProducts.find(p => 
      p.images.some(image => image.includes(img.file.replace('.webp', '')))
    ) || categoryProducts[idx] || categoryProducts[0];

    // ✅ GENERAR CLAVE ÚNICA para cada producto
    const uniqueId = realProduct?.id 
      ? `${realProduct.id}-${idx}` // Si hay producto real, agregar índice para hacerlo único
      : `${category}-${img.file}-${idx}`; // Si no, usar combinación única

    return {
      id: uniqueId, // ✅ CLAVE ÚNICA
      image: img.src,
      file: img.file,
      title: img.title || realProduct?.name || `${catMeta.title} ${idx + 1}`,
      description: img.description || "",
      price: realProduct?.price || 0,
      stock: realProduct?.stock || 0,
      sizes: realProduct?.sizes || ["M", "L", "XL"],
    };
  });

  // ✅ FILTRAR DUPLICADOS POR SEGURIDAD
  const uniqueClientData = clientData.filter((product, index, self) => 
    index === self.findIndex(p => p.id === product.id)
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{catMeta.title}</h1>
        {/* ProductGrid is a client component that receives a serializable array */}
        <ProductGrid products={uniqueClientData} />
      </div>
    </main>
  );
}