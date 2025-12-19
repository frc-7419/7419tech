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
        hostname: 'innovative-luck-8fe8e1c24e.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'innovative-luck-8fe8e1c24e.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
  // Exclude strapi-cms directory from Next.js build
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/strapi-cms/**', '**/strapi-cms-v2/**', '**/node_modules/**'],
    };
    
    // Exclude strapi-cms from module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Ignore strapi-cms directory completely
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push(/^strapi-cms\//);
      config.externals.push(/^strapi-cms-v2\//);
    }
    
    return config;
  },
  // Set output file tracing root to silence warnings
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
