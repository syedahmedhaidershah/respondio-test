import { DataTypes } from 'sequelize';
import sequelize from './index';

/**
 * User model definition.
 * @typedef {Object} User
 * @property {string} username - The username of the user.
 * @property {string} password - The hashed password of the user.
 */
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default User;
