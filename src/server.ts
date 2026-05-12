import app from './app.js';
import config from 'config';
import logger from './config/logger.js';
import dbConnection from './config/db.js';

const startServer = async () => {
    await dbConnection();
    app.listen(config.get('server.port'), () =>
        logger.info('Server is running', { port: config.get('server.port') })
    );
};

startServer();
