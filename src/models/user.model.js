import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['username', 'email'],
    },
  ],
});

export default User;
