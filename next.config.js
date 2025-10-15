/** @type {import('next').NextConfig} */
const nextConfig = {
  // CONFIGURACIÓN MÍNIMA - SIN TURBOPACK
  output: 'standalone',
  
  images: {
    domains: ['localhost'],
  },
  
  // Desactivar completamente características experimentales
  experimental: {
    turbo: false
  }
}

module.exports = nextConfig