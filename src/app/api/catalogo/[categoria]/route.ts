import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const catalogPath = path.join(process.cwd(), "public", "catalogo");
  const categories = fs.readdirSync(catalogPath).filter((f) => fs.lstatSync(path.join(catalogPath, f)).isDirectory());

  const result = categories.map((cat) => {
    const catPath = path.join(catalogPath, cat);
    const images = fs.readdirSync(catPath).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
    const cover = images.length > 0 ? `/catalogo/${cat}/${images[0]}` : "/no-image.webp";
    return { name: cat, cover };
  });

  return NextResponse.json(result);
}
