// @ts-check
/** @type {import('next').NextConfig} */

// Security headers configuration
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://www.google-analytics.com https://api.stripe.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "media-src 'self' data:",
    ].join('; '),
  },
];

const nextConfig = {
  // Enable React strict mode in development
  reactStrictMode: true,
  
  // Enable production source maps for better error tracking
  productionBrowserSourceMaps: true,
  
  // Optimize image loading with Next.js Image component
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
  webpack: (config) => { // Removed unused destructured parameters
    // Add TypeScript loader
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
      ],
    });

    // Add SVGR for SVG components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Add environment variables to the client
    const webpack = require('webpack');
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      })
    );

    return config;
  },
  
  // Configure headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  
  // Configure redirects
  async redirects() {
    return [
      // Add any permanent redirects here
      // Example:
      // {
      //   source: '/old-route',
      //   destination: '/new-route',
      //   permanent: true,
      // },
    ];
  },
  
  // Configure rewrites
  async rewrites() {
    return [
      // Add any rewrites here
      // Example:
      // {
      //   source: '/api/:path*',
      //   destination: 'https://api.example.com/:path*',
      // },
    ];
  },
  
  // Configure i18n for internationalization
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  
  // Enable compression in production
  compress: true,
  
  // Configure static export if needed
  // output: 'export',
  
  // Configure trailing slash behavior
  trailingSlash: false,
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Configure experimental features
  experimental: {
    // Enable server actions
    serverActions: true,
    // Enable new Next.js Link behavior
    newNextLinkBehavior: true,
    // Enable optimized package imports
    optimizePackageImports: [
      'react-icons',
      'date-fns',
      'lodash-es',
      '@headlessui/react',
    ],
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
  
  // Configure logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

// Add Sentry configuration in production
if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const { withSentryConfig } = require('@sentry/nextjs');
  
  module.exports = withSentryConfig(
    nextConfig,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options
      
      // Suppresses source map uploading logs during build
      silent: true,
      
      org: 'your-org-name',
      project: 'dropcart',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
      
      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,
      
      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: false,
      
      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',
      
      // Hides source maps from generated client bundles
      hideSourceMaps: false,
      
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
      
      // Enables automatic instrumentation of Vercel Cron Monitors
      automaticVercelMonitors: true,
    }
  );
} else {
  module.exports = nextConfig;
}
