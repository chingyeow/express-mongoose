import http from 'http';
import config from './configs/config';
import Logger from './ultils/logger';

import startExpress from './loaders/express';

/**
 * Load all dependencies and start server
 */
const startServer = async () => {
    const expressApp = await startExpress();
    Logger.info('Express loaded');

    const server = http.createServer(expressApp);
    server.listen(config.port, () => {
        Logger.info(`Server listening on port ${config.port}`);
    });
};

startServer();

export default startServer();
