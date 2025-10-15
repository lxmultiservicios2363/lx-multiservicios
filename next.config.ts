import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ======================
  // SEGURIDAD HTTPS
  // ======================
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },

  // ======================
  // OPTIMIZACIÓN DE IMÁGENES
  // ======================
  images: {
    // Dominios permitidos para imágenes remotas (si usas alguna)
    domains: [],
    // Formatos modernos de imagen
    formats: ['image/avif', 'image/webp'],
    // Tamaños para dispositivos (mobile -> 4K)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Tamaños para responsive
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ======================
  // PERFORMANCE
  // ======================
  // Compresión GZIP/Brotli
  compress: true,
  
  // Optimización del compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remover consoles en producción
  },

  // ======================
  // ENVIRONMENT VARIABLES
  // ======================
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // ======================
  // REDIRECCIONES (Ejemplo - personaliza según necesites)
  // ======================
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // Puedes agregar más redirecciones aquí
    ];
  },
};

export default nextConfig;