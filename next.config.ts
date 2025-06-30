import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ⚠️ Опасно: игнорирование ошибок проверки типов
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Опасно: игнорирование ошибок линтера
    ignoreDuringBuilds: true,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
    path: '/template2/_next/image'
  },
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@use "@/styles/variables" as *;`
  },
  output: 'export',
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/template2' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/template2/' : '',
  trailingSlash: true,
  compress: true,
  // Enable React strict mode for improved development experience
  reactStrictMode: true,
  // Enable optimizations in production builds
  productionBrowserSourceMaps: false,
  // Configure page data collection for better insights
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  }
};

export default nextConfig;
