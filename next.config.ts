import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@use "@/styles/variables" as *;`
  },
  async redirects() {
    return [
      {
        source: '/rederict/animals',
        destination: '/animals',
        permanent: true,
      },
      {
        source: '/rederict/tickets',
        destination: '/tickets',
        permanent: true,
      },
      {
        source: '/rederict/events',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/rederict/location',
        destination: '/location',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
