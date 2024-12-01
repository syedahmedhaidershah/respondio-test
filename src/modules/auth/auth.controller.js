import { registerUserService, loginUserService } from './auth.service';
import logger from '../../libraries/logger.library';

export const registerUser = async (req, res) => {
  try {
    logger.info('Registering new user', { username: req.body.username });
    const { username, password, email } = req.body;
    const user = await registerUserService({ username, password, email });
    logger.info('User registered successfully', { userId: user.id });
    res.status(201).json(user);
  } catch (error) {
    logger.error('Error registering user', { error });
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const loginUser = async (req, res) => {
  try {
    logger.info('User login attempt', { username: req.body.username });
    const { username, password } = req.body;
    const result = await loginUserService({ username, password });
    if (result) {
      logger.info('User logged in successfully', { username });
      res.json(result);
    } else {
      logger.warn('Invalid credentials', { username });
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    logger.error('Error logging in user', { error });
    res.status(500).json({ message: 'Error logging in user' });
  }
};
