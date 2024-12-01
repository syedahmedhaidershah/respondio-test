import Note from '../../models/note.model';

class NoteFactory {
  static createNote(type, { title, content, userId }) {
    switch (type) {
      case 'personal':
        return NoteFactory.createPersonalNote({ title, content, userId });
      case 'work':
        return NoteFactory.createWorkNote({ title, content, userId });
      default:
        throw new Error('Invalid note type');
    }
  }

  static createPersonalNote({ title, content, userId }) {
    return Note.create({ title, content, userId, type: 'personal' });
  }

  static createWorkNote({ title, content, userId }) {
    return Note.create({ title, content, userId, type: 'work' });
  }
}

export default NoteFactory;
