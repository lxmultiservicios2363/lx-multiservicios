// src/app/catalogo/page.tsx - CON MODO OSCURO
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Catálogo</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <article key={c.slug} className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative w-full h-[280px] sm:h-[320px]">
                {c.cover ? (
                  <Image
                    src={c.cover}
                    alt={c.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={categories.indexOf(c) < 4}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{c.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{c.count} producto(s)</p>
                <Link
                  href={`/catalogo/${c.slug}`}
                  className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
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