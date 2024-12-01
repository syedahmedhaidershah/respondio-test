import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.model';
import config from '../../config';
import logger from '../../libraries/logger.library';

export const registerUserService = async ({ username, password, email }) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = await User.create({ username, password: hashedPassword, email });
    // Return safe user model
    return { id: user.id, username: user.username, email: user.email };
  } catch (error) {
    logger.error('Error registering user', { error });
    throw new Error('Error registering user');
  }
};

export const loginUserService = async ({ username, email, password }) => {
  try {
    // Find the user by username or email
    const user = await User.findOne({ 
      where: { 
        [Op.or]: [{ username }, { email }] 
      } 
    });
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: '1h' });
      // Return safe user model with token
      return { token, user: { id: user.id, username: user.username, email: user.email } };
    }
    return null;
  } catch (error) {
    logger.error('Error logging in user', { error });
    throw new Error('Error logging in user');
  }
};
