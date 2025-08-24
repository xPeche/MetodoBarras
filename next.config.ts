/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/MetodoBarras',
  assetPrefix: '/MetodoBarras/'
}

module.exports = nextConfig