// Client-side environment variables
type Env = {
  // Next.js public runtime config
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY?: string;
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY?: string;
  NODE_ENV: 'development' | 'production' | 'test';
};

// Ensure all required environment variables are set
const requiredEnvVars = [
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_API_URL',
] as const;

// Validate environment variables at build time
const validateEnvVars = () => {
  if (typeof window === 'undefined') {
    // Server-side validation
    const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }
  }
};

// Export validated environment variables
export const env: Env = {
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  NODE_ENV: (process.env.NODE_ENV as Env['NODE_ENV']) || 'development',
};

// Validate environment variables when this module is imported
if (process.env.NODE_ENV !== 'test') {
  validateEnvVars();
}

// Helper functions
export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';

/**
 * Get the full URL for a given path
 * @param path - Path to append to the base URL
 * @returns Full URL
 */
export const getFullUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${env.NEXT_PUBLIC_APP_URL}/${cleanPath}`;
};

/**
 * Get the full API URL for a given endpoint
 * @param endpoint - API endpoint to append to the base API URL
 * @returns Full API URL
 */
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/')
    ? endpoint.slice(1)
    : endpoint;
  return `${env.NEXT_PUBLIC_API_URL}/${cleanEndpoint}`;
};
