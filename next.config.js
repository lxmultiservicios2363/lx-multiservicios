/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desactivar Turbopack para evitar errores de CSS
  experimental: {
    turbo: undefined,
  },
  
  // Configuraciones de seguridad
  poweredByHeader: false,
  compress: true,
  
  // Configuración de imágenes
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;