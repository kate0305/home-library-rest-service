import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const SECRET = process.env.JWT_SECRET_KEY || 'secretKey';
export const SECRET_REFRESH =
  process.env.JWT_SECRET_REFRESH_KEY || 'secretKeyRefresh';
export const EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';
export const REFRESH_EXPIRE_TIME =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';
export const SALT = process.env.CRYPT_SALT || '10';
