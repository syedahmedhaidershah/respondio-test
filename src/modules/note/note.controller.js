import { createNoteService, getNotesService, getNoteByIdService, updateNoteService, deleteNoteService } from './note.service';
import logger from '../../libraries/logger.library';

export const createNote = async (req, res) => {
  try {
    logger.info('Creating a new note', { userId: req.userId });
    const { title, content, type } = req.body;
    const note = await createNoteService({ title, content, userId: req.userId, type });
    logger.info('Note created successfully', { noteId: note.id });
    res.status(201).json(note);
  } catch (error) {
    logger.error('Error creating note', { error });
    res.status(500).json({ message: 'Error creating note' });
  }
};

export const getNotes = async (req, res) => {
  try {
    logger.info('Fetching notes', { userId: req.userId });
    const notes = await getNotesService(req.userId);
    logger.info('Notes fetched successfully', { count: notes.length });
    res.json(notes);
  } catch (error) {
    logger.error('Error fetching notes', { error });
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

export const getNoteById = async (req, res) => {
  try {
    logger.info('Fetching note by ID', { noteId: req.params.id, userId: req.userId });
    const note = await getNoteByIdService(req.params.id, req.userId);
    if (note) {
      logger.info('Note fetched successfully', { noteId: note.id });
      res.json(note);
    } else {
      logger.warn('Note not found', { noteId: req.params.id });
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    logger.error('Error fetching note', { error });
    res.status(500).json({ message: 'Error fetching note' });
  }
};

export const updateNote = async (req, res) => {
  try {
    logger.info('Updating note', { noteId: req.params.id, userId: req.userId });
    const { title, content } = req.body;
    const note = await updateNoteService(req.params.id, req.userId, { title, content });
    if (note) {
      logger.info('Note updated successfully', { noteId: note.id });
      res.json(note);
    } else {
      logger.warn('Note not found', { noteId: req.params.id });
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    logger.error('Error updating note', { error });
    res.status(500).json({ message: 'Error updating note' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    logger.info('Deleting note', { noteId: req.params.id, userId: req.userId });
    const note = await deleteNoteService(req.params.id, req.userId);
    if (note) {
      logger.info('Note deleted successfully', { noteId: req.params.id });
      res.status(204).end();
    } else {
      logger.warn('Note not found', { noteId: req.params.id });
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    logger.error('Error deleting note', { error });
    res.status(500).json({ message: 'Error deleting note' });
  }
};
