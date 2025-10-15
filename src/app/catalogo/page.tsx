// src/app/catalogo/page.tsx - OPTIMIZADO PARA MÓVIL Y DESKTOP
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Título optimizado */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900 dark:text-white">
          Catálogo
        </h1>

        {/* Grid completamente responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((c) => (
            <article 
              key={c.slug} 
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm sm:shadow overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md sm:hover:shadow-lg transition-all duration-300"
            >
              {/* Imagen optimizada para móvil */}
              <div className="relative w-full h-[180px] xs:h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]">
                {c.cover ? (
                  <Image
                    src={c.cover}
                    alt={c.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 475px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={categories.indexOf(c) < 4}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                    Sin imagen
                  </div>
                )}
              </div>

              {/* Contenido optimizado */}
              <div className="p-3 sm:p-4 text-center">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {c.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                  {c.count} producto{c.count !== 1 ? 's' : ''}
                </p>
                <Link
                  href={`/catalogo/${c.slug}`}
                  className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-3 sm:px-4 py-2 sm:py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 text-sm sm:text-base font-medium min-w-[100px] sm:min-w-[120px]"
                >
                  Ver más
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}