import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, config.jwtSecret as Secret, { 
    expiresIn: config.jwtExpiresIn as SignOptions['expiresIn']
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret as Secret);
}; 