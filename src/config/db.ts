import mongoose from 'mongoose';
import config from 'config';
import logger from './logger.js';

export default async function dbConnection() {
    try {
        const connection = await mongoose.connect(config.get('db.url'));

        logger.info({
            message: '✅ MongoDB connected successfully',
            host: connection.connection.host,
            database: connection.connection.name,
        });
    } catch (error) {
        logger.error({
            message: '❌ Mongodb connection failed',
            error,
        });
    }
}
