// Import the rateLimit function from express-rate-limit
import rateLimit from 'express-rate-limit';
// Import configuration constants for rate limiting
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } from '../config/rate-limiter';

let rateLimiter;

try {
  // Initialize the rate limiter middleware with specified options
  rateLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS, // Time window in milliseconds
    max: RATE_LIMIT_MAX, // Maximum number of requests allowed within the window
    message: 'Too many requests, please try again later.' // Message to send when rate limit is exceeded
  });
} catch (error) {
  // Log the error if initialization fails
  console.error('Failed to initialize rate limiter middleware:', error);
}

// Export the rate limiter middleware
export default rateLimiter;
