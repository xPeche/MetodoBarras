/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/MetodoBarras', // nombre de tu repositorio
  assetPrefix: '/MetodoBarras/'
}

module.exports = nextConfig
