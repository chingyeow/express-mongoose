import express, { Application } from 'express';

import config from '../configs/config';

type ApplicationProps {
    
}

export default (): Application => {
    const app = express();

    // healthcheck endpoint
    app.get(`${config.api.prefix}/health`, (req, res) => {
        res.status(200).end();
    });
    app.head(`${config.api.prefix}/health`, (req, res) => {
        res.status(200).end();
    });

    return app;
};
