/** @type {import('next').NextConfig} */
const nextConfig = {
  // CONFIGURACIÓN MÍNIMA - SIN TURBOPACK
  output: 'standalone',
  
  images: {
    domains: ['localhost'],
  },
  
  // Desactivar completamente características experimentales
  experimental: {
    // ELIMINADO: turbo: false (causaba error en Next.js 14)
  }
}

module.exports = nextConfig