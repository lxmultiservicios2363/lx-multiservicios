// src/app/catalogo/page.tsx - CATÁLOGO COMPLETAMENTE OPTIMIZADO
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "../../lib/categories";

type CategoryCard = { slug: string; title: string; cover?: string; count: number };

export default async function CatalogPage() {
  const publicCatalogPath = path.join(process.cwd(), "public", "catalogo");
  const categories: CategoryCard[] = [];

  for (const cat of CATEGORIES) {
    const catFullPath = path.join(publicCatalogPath, cat.slug);
    let cover: string | undefined = undefined;
    let count = 0;

    try {
      if (fs.existsSync(catFullPath) && fs.lstatSync(catFullPath).isDirectory()) {
        const files = fs.readdirSync(catFullPath).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
        count = files.length;
        if (files.length > 0) cover = `/catalogo/${cat.slug}/${files[0]}`;
      }
    } catch (e) {
      // ignore
    }

    categories.push({ slug: cat.slug, title: cat.title, cover, count });
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* ✅ TÍTULO OPTIMIZADO PARA MÓVIL */}
        <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-gray-900 dark:text-white">
          Catálogo
        </h1>

        {/* ✅ GRID 2 COLUMNAS MÓVIL - COMPLETAMENTE RESPONSIVE */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {categories.map((c, index) => (
            <article 
              key={c.slug} 
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xs sm:shadow-sm overflow-hidden border border-gray-100 dark:border-gray-600 hover:shadow-md sm:hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {/* ✅ CONTENEDOR DE IMAGEN OPTIMIZADO POR DISPOSITIVO */}
              <div className="relative w-full aspect-square">
                {c.cover ? (
                  <Image
                    src={c.cover}
                    alt={c.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    priority={index < 4} // ✅ LOADING OPTIMIZADO: Solo primeras 4 imágenes
                    loading={index >= 4 ? "lazy" : "eager"}
                    quality={75}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 text-xs sm:text-sm p-2">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* ✅ CONTENIDO OPTIMIZADO PARA MÓVIL Y DESKTOP */}
              <div className="p-2 xs:p-3 sm:p-4 text-center space-y-1 xs:space-y-2">
                <h2 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5em] leading-tight">
                  {c.title}
                </h2>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {c.count} producto{c.count !== 1 ? 's' : ''}
                </p>
                <Link
                  href={`/catalogo/${c.slug}`}
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-md xs:rounded-lg text-[10px] xs:text-xs sm:text-sm font-medium min-w-[60px] xs:min-w-[70px] sm:min-w-[80px] transition-all duration-200 hover:scale-105 shadow-xs hover:shadow-sm"
                >
                  Ver más
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ✅ LOADING STATES OPTIMIZADOS (Opcional - para mejor UX) */}
        {categories.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="animate-pulse">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-[200px] animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}