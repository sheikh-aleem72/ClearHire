import dotenv from 'dotenv';

// dotenv.config();
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

interface EnvConfig {
  PORT: number;
  DB_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_ACCESS_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  OTP_EXPIRES_MINUTES: number;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_API_KEY: string;
  PARSER_SERVICE_URL: string;
  REDIS_URL: string;
  MAX_RESUMES_PER_BATCH: number;
  MAX_TOTAL_BYTES_PER_BATCH: number;
  DELETE_QUEUE_NAME: string;
  CONTACT_RECEIVER_EMAIL: string;
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
}

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export const env: EnvConfig = {
  PORT: Number(getEnvVar('PORT')),
  DB_URL: getEnvVar('DB_URL'),
  JWT_ACCESS_SECRET: getEnvVar('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: getEnvVar('JWT_REFRESH_SECRET'),
  JWT_REFRESH_EXPIRES_IN: getEnvVar('JWT_REFRESH_EXPIRES_IN'),
  JWT_ACCESS_EXPIRES_IN: getEnvVar('JWT_ACCESS_EXPIRES_IN'),
  OTP_EXPIRES_MINUTES: Number(getEnvVar('OTP_EXPIRES_MINUTES')),
  CLOUDINARY_API_KEY: getEnvVar('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: getEnvVar('CLOUDINARY_API_SECRET'),
  CLOUDINARY_CLOUD_NAME: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  PARSER_SERVICE_URL: getEnvVar('PARSER_SERVICE_URL'),
  REDIS_URL: getEnvVar('REDIS_URL'),
  MAX_RESUMES_PER_BATCH: 50,
  MAX_TOTAL_BYTES_PER_BATCH: 200 * 1024 * 1024,
  DELETE_QUEUE_NAME: getEnvVar('DELETE_QUEUE_NAME'),
  CONTACT_RECEIVER_EMAIL: getEnvVar('CONTACT_RECEIVER_EMAIL'),
  RESEND_API_KEY: getEnvVar('RESEND_API_KEY'),
  RESEND_FROM_EMAIL: getEnvVar('RESEND_FROM_EMAIL'),
};
