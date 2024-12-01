import Note from '../../models/note.model';
import getRedisClient from '../../libraries/redis-client.library';
import NoteFactory from './note.factory';
import logger from '../../libraries/logger.library';

/**
 * Get Redis client
 */
const redisClient = getRedisClient();

export const createNoteService = async ({ title, content, userId, type }) => {
  try {
    // Create a new note using the factory
    const note = await NoteFactory.createNote(type, { title, content, userId });
    // Invalidate cache
    await redisClient.del(`notes:${userId}`);
    return note;
  } catch (error) {
    logger.error('Error creating note', { error });
    throw new Error('Error creating note');
  }
};

export const getNotesService = async (userId) => {
  try {
    // Try to get notes from Redis cache
    let notes = await redisClient.get(`notes:${userId}`);
    
    if (notes) {
      return JSON.parse(notes);
    } 
    
    // Fetch notes from database if not in cache
    notes = await Note.findAll({ where: { userId } });
    await redisClient.setex(`notes:${userId}`, 3600, JSON.stringify(notes));
    return notes;
  } catch (err) {
    logger.error('Error fetching notes', { error: err });
    throw new Error('Error fetching notes');
  }
};

export const getNoteByIdService = async (id, userId) => {
  try {
    // Fetch a note by ID
    return await Note.findOne({ where: { id, userId } });
  } catch (error) {
    logger.error('Error fetching note by ID', { error });
    throw new Error('Error fetching note by ID');
  }
};

export const updateNoteService = async (id, userId, { title, content }) => {
  try {
    // Find the note to update
    const note = await Note.findOne({ where: { id, userId } });
    if (note) {
      // Update note properties
      note.title = title;
      note.content = content;
      await note.save();
      // Invalidate cache
      await redisClient.del(`notes:${userId}`);
      return note;
    }
    return null;
  } catch (error) {
    logger.error('Error updating note', { error });
    throw new Error('Error updating note');
  }
};

export const deleteNoteService = async (id, userId) => {
  try {
    // Find the note to delete
    const note = await Note.findOne({ where: { id, userId } });
    if (note) {
      await note.destroy();
      // Invalidate cache
      await redisClient.del(`notes:${userId}`);
      return note;
    }
    return null;
  } catch (error) {
    logger.error('Error deleting note', { error });
    throw new Error('Error deleting note');
  }
};
