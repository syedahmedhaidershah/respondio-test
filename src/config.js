import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

/**
 * Schema for environment variables validation.
 */
const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  JWT_SECRET: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number)
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

export default env.data;
