import { createLogger, format, transports } from 'winston';
import config from '../config';

const logger = createLogger({
  level: config.LOG_LEVEL || 'info',
  format: format.combine(
    format.colorize({ all: true }), // Colorize all log levels
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

export const requestLogger = format.printf(({ timestamp, level, message, meta }) => {
  return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta, null, 2) : ''}`;
});

export default logger;
