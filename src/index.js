import express from 'express';
import config from './config';
import sequelize from './models';
import redis from 'redis';
import notesRouter from './routes/notes';
import authRouter from './routes/auth';

/**
 * Initialize Express app
 */
const app = express();

/**
 * Create Redis client
 */
const redisClient = redis.createClient({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT
});

/**
 * Middleware to parse JSON requests
 */
app.use(express.json());

/**
 * Routes for notes and authentication
 */
app.use('/notes', notesRouter);
app.use('/auth', authRouter);

/**
 * Authenticate and connect to the database
 */
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

/**
 * Start the server
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * Export Redis client
 */
export { redisClient };
