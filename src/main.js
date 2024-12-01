import connectDB from './config/db';
import app from './app';

(async () => {
    try {
        await connectDB();

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
    }
})();
