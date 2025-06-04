// @ts-check

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    // Fixes for known flexbox bugs
    'postcss-flexbugs-fixes',
    
    // Support for @import rules
    'postcss-import',
    
    // Support for modern CSS features
    [
      'postcss-preset-env',
      {
        stage: 1,
        features: {
          'nesting-rules': true,
          'custom-properties': { preserve: false },
        },
      },
    ],
    
    // Tailwind CSS
    'tailwindcss',
    
    // Autoprefixer
    [
      'autoprefixer',
      {
        // Options for autoprefixer
        grid: 'autoplace',
      },
    ],
    
    // Only enable in production
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: [
                './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
                './src/components/**/*.{js,ts,jsx,tsx,mdx}',
                './src/app/**/*.{js,ts,jsx,tsx,mdx}',
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: {
                standard: [
                  'html',
                  'body',
                  /^dark/,
                  /^light/,
                  /^theme-/,
                ],
                deep: [/^swiper/],
                greedy: [
                  /^slick-/,
                  /^carousel-/,
                  /^Toastify/,
                  /^react-/,
                ],
              },
            },
          ],
          [
            'cssnano',
            {
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                  normalizeWhitespace: true,
                  minifyFontValues: { removeQuotes: false },
                  // Disable z-index minification as it can break some components
                  zindex: false,
                },
              ],
            },
          ],
        ]
      : []),
  ],
};
