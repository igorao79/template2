/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@use "@/styles/variables" as *;`
  },
  output: 'export',
  distDir: 'out',
  basePath: '/template2',
  assetPrefix: '/template2/',
  trailingSlash: true,
  reactStrictMode: true,
  
  // Экспорт для GitHub Pages
  skipTrailingSlashRedirect: true,
  
  // Оптимизация для статического экспорта
  experimental: {
    optimizePackageImports: ['framer-motion', 'leaflet'],
  },
  
  // Оптимизация сборки
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Webpack оптимизации
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Минимизация bundle размера
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig; 