import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Export estático: gera HTML puro em /out — roda em qualquer hospedagem
  // (cPanel, Apache, Nginx, Vercel, Netlify) sem Node no servidor.
  output: 'export',
  images: { unoptimized: true }, // assets já pré-otimizados em WebP responsivo
  trailingSlash: true,
  reactStrictMode: true,
}

export default nextConfig
