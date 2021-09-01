import { sequelizeAuthenticate } from './database';
import cors from "cors";
import express from "express";

export class App {
    private express: express.Application;
    private port = 3000;

    constructor() {
        this.express = express();
        this.listen();
        this.middlewares();
        this.database();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log('Aplicação iniciada na porta 3000!');
        });
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private async database() {
        await sequelizeAuthenticate();
        console.log('Banco conectado com sucesso!');
    }
}