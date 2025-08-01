/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'example.com']
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;