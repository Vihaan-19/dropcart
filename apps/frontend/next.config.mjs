// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode in development
  reactStrictMode: true,
  
  // Enable production source maps for better error tracking
  productionBrowserSourceMaps: true,
  
  // Enable Turbopack
  experimental: {
    turbo: {}
  },
  
  // Configure images
  images: {
    domains: [
      'localhost',
      'dropcart.com',
      'www.dropcart.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Configure webpack
  webpack: (config) => {
    // Add SVGR for SVG components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
  
  // Configure modularize imports for better tree-shaking
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Configure i18n for internationalization
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  
  // Enable compression in production
  compress: true,
  
  // Configure trailing slash behavior
  trailingSlash: false,
  
  // Configure logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

// Export the configuration
module.exports = nextConfig;