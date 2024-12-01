import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from '../modules/note/note.controller';
import { validateCreateNote, validateUpdateNote } from '../middleware/note.validator';

const router = express.Router();

router.post('/', authenticate, validateCreateNote, createNote);
router.get('/', authenticate, getNotes);
router.get('/:id', authenticate, getNoteById);
router.put('/:id', authenticate, validateUpdateNote, updateNote);
router.delete('/:id', authenticate, deleteNote);

export default router;
