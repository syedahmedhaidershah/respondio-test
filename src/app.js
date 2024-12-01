import express from 'express';
import notesRouter from './routes/notes.routes';
import authRouter from './routes/auth.routes';
import helmet from 'helmet';
import rateLimiter from './middleware/rate-limiter.middleware';
import jsonParser from './middleware/json-parser.middleware';
import logger from './libraries/logger.library';
import { requestLogger } from './libraries/logger.library';

/**
 * Initialize Express app
 */
const app = express();

/**
 * Middleware to log incoming requests
 */
app.use((req, res, next) => {
  logger.info(requestLogger.transform({ timestamp: new Date().toISOString(), level: 'info', message: `Incoming request: ${req.method} ${req.url}`, meta: { headers: req.headers, query: req.query, body: req.body } }));
  next();
});

/**
 * Middleware to parse JSON requests
 */
app.use(jsonParser);

/**
 * Use Helmet for security with custom configuration
 */
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "host.docker.internal", "127.0.0.1", "docker.for.mac.host.docker.internal", "host.docker.internal"]
    }
  }
};
app.use(helmet(helmetConfig));

/**
 * Rate limiting middleware
 */
app.use(rateLimiter);

/**
 * Base router for API versioning
 */
const apiRouter = express.Router();
app.use('/api/v1', apiRouter);

/**
 * Routes for notes and authentication
 */
apiRouter.use('/notes', notesRouter);
apiRouter.use('/auth', authRouter);

/**
 * Health check endpoint
 */
apiRouter.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/**
 * Wildcard route for handling 404
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Example usage
 */
logger.info('Application started');

/**
 * Export Express app
 */
export default app;
