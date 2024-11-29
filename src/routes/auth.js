import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';

const router = express.Router();

/**
 * Route to register a new user.
 * @route POST /auth/register
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  res.status(201).json(user);
});

/**
 * Route to login a user.
 * @route POST /auth/login
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
