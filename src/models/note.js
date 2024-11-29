import { DataTypes } from 'sequelize';
import sequelize from './index';
import User from './user';

/**
 * Note model definition.
 * @typedef {Object} Note
 * @property {string} title - The title of the note.
 * @property {string} content - The content of the note.
 */
const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Define associations
Note.belongsTo(User);
User.hasMany(Note);

export default Note;
