import express from 'express'
import { resolve } from 'node:path';
import cors from 'cors'

import routes from './routes';
import './database';

class App {
    constructor() {
        this.app = express();
        
        this.middlewares();
        this.routes();
    }

    middlewares() {
       
        const corsOptions = {
            origin: process.env.CORS_ORIGIN || '*',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization']
        };
        
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;