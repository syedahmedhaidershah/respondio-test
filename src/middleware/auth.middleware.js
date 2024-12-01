import jwt from 'jsonwebtoken';
import config from '../modules/config/config.service.js';
import logger from '../libraries/logger.library';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (token) {
      logger.info('Token received', { token });
      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          logger.warn('Invalid token', { error: err });
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          req.userId = decoded.id;
          logger.info('Token verified successfully', { userId: req.userId });
          next();
        }
      });
    } else {
      logger.warn('No token provided');
      res.status(401).json({ message: 'No token provided' });
    }
  } catch (error) {
    logger.error('Error authenticating token', { error });
    res.status(500).json({ message: 'Error authenticating token' });
  }
};
