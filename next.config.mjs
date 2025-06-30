/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@use "@/styles/variables" as *;`
  },
  output: 'export',
  distDir: 'out',
  basePath: '/zoo',
  assetPrefix: '/zoo/',
  trailingSlash: true,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  }
};

export default nextConfig; 