export const config = {
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development'
}; 