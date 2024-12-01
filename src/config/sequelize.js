import { Sequelize } from 'sequelize';
import env from '../config';

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    dialect: 'mysql',
});

export default sequelize;
