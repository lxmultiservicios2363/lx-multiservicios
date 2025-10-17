// src/app/catalogo/[category]/page.tsx - COMPLETAMENTE OPTIMIZADO
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

export default async function CategoryPage({ params }: Props) {
  const { category } = params;
  
  const catMeta = CATEGORIES.find((c) => c.slug === category);
  if (!catMeta) return notFound();

  const catPath = path.join(process.cwd(), "public", "catalogo", category);
  
  let files: string[] = [];
  try {
    if (!fs.existsSync(catPath) || !fs.statSync(catPath).isDirectory()) {
      return notFound();
    }
    
    const allFiles = fs.readdirSync(catPath).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
    files = allFiles.slice(0, 20);
  } catch (error) {
    console.error("Error reading directory:", error);
    return notFound();
  }

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
    }
  }

  const images: ImgItem[] = files.map((f) => ({
    src: `/catalogo/${category}/${f}`,
    file: f,
    title: infoMap[f]?.title || "",
    description: infoMap[f]?.description || "",
  }));

  const categoryProducts = PRODUCTS.filter(product => product.category === category);

  const clientData = images.map((img, idx) => {
    const realProduct = categoryProducts.find(p => 
      p.images.some(image => image.includes(img.file.replace('.webp', '')))
    ) || categoryProducts[idx] || categoryProducts[0];

    const uniqueId = realProduct?.id 
      ? `${realProduct.id}-${idx}`
      : `${category}-${img.file}-${idx}`;

    return {
      id: uniqueId,
      image: img.src,
      file: img.file,
      title: img.title || realProduct?.name || `${catMeta.title} ${idx + 1}`,
      description: img.description || "",
      price: realProduct?.price || 0,
      stock: realProduct?.stock || 0,
      sizes: realProduct?.sizes || ["M", "L", "XL"],
    };
  });

  const uniqueClientData = clientData.filter((product, index, self) => 
    index === self.findIndex(p => p.id === product.id)
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* ✅ TÍTULO RESPONSIVE */}
        <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white text-center sm:text-left">
          {catMeta.title}
        </h1>
        
        {/* ✅ PRODUCTGRID CON DATOS OPTIMIZADOS */}
        <ProductGrid products={uniqueClientData} />
      </div>
    </main>
  );
}