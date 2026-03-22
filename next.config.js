/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'via.placeholder.com'],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;
