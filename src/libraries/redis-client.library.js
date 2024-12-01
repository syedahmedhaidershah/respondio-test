import redis from 'redis';
import config from '../config';
import { promisify } from 'util';

let redisClient;

const getRedisClient = () => {
  if (!redisClient) {
    try {
      // Initialize Redis client
      redisClient = redis.createClient({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
        password: config.REDIS_PASS // Add password to the configuration
      });
      // Promisify Redis client methods
      redisClient.get = promisify(redisClient.get).bind(redisClient);
      redisClient.setex = promisify(redisClient.setex).bind(redisClient);
    } catch (error) {
      // Log the error if initialization fails
      console.error('Failed to initialize Redis client:', error);
    }
  }
  return redisClient;
};

export default getRedisClient;
