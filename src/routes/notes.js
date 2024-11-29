import express from 'express';
import jwt from 'jsonwebtoken';
import Note from '../models/note';
import { redisClient } from '../index';
import config from '../config';

const router = express.Router();

/**
 * Middleware to authenticate the user using JWT.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

/**
 * Route to create a new note.
 * @route POST /notes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, UserId: req.userId });
  res.status(201).json(note);
});

/**
 * Route to get all notes for the authenticated user.
 * @route GET /notes
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/', authenticate, async (req, res) => {
  redisClient.get(`notes:${req.userId}`, async (err, notes) => {
    if (notes) {
      res.json(JSON.parse(notes));
    } else {
      const notes = await Note.findAll({ where: { UserId: req.userId } });
      redisClient.setex(`notes:${req.userId}`, 3600, JSON.stringify(notes));
      res.json(notes);
    }
  });
});

/**
 * Route to get a specific note by ID.
 * @route GET /notes/:id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/:id', authenticate, async (req, res) => {
  const note = await Note.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

/**
 * Route to update a specific note by ID.
 * @route PUT /notes/:id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.put('/:id', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (note) {
    note.title = title;
    note.content = content;
    await note.save();
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

/**
 * Route to delete a specific note by ID.
 * @route DELETE /notes/:id
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.delete('/:id', authenticate, async (req, res) => {
  const note = await Note.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (note) {
    await note.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

export default router;
