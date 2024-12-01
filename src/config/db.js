import sequelize from './sequelize';
import env from '../config';

const connectDB = async (retries = 5, delay = 5000) => {
    while (retries) {
        try {
            await sequelize.authenticate();
            console.log('Database connected...');
            if (!!env.SYNC_DB) {
                await sequelize.sync();
            }
            console.log('Database synced');
            break;
        } catch (err) {
            console.error('Unable to connect to the database:', err);
            retries -= 1;
            console.log(`Retries left: ${retries}`);
            if (!retries) throw err;
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

export default connectDB;
