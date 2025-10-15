/** @type {import('next').NextConfig} */
const nextConfig = {
  // CONFIGURACIÓN MÍNIMA - SIN TURBOPACK
  output: 'standalone',
  
  images: {
    domains: ['localhost'],
  },
  
  // Desactivar completamente características experimentales
  experimental: {
  }
}

module.exports = nextConfig