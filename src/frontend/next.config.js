/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // Proxy API requests to the backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
  // Configure base path
  basePath: '',
  // Configure output directory
  distDir: '.next',
  // Configure image domains
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 