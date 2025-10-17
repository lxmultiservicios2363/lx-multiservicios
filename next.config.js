/** @type {import('next').NextConfig} */
const nextConfig = {
  // CONFIGURACIÓN MÍNIMA - SIN TURBOPACK
  output: 'standalone',
  
  // ✅ CONFIGURACIÓN ACTUALIZADA - SIN WARNINGS
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  
  // Desactivar completamente características experimentales
  experimental: {
    // Configuración limpia sin turbo
  }
}

module.exports = nextConfig