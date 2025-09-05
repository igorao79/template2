/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/template2',
  assetPrefix: '/template2/',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig; 