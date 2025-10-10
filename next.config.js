/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'honest-hero-e5c6b36041.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'honest-hero-e5c6b36041.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
  // Exclude strapi-cms directory from Next.js build
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/strapi-cms/**', '**/node_modules/**'],
    };
    return config;
  },
  // Set output file tracing root to silence warnings
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
