import { sequelizeAuthenticate } from './database';
import cors from "cors";
import express from "express";
import UserRoute from './app/routes/user.route';
import CompanyRoute from './app/routes/company.route';
import AddressRoute from './app/routes/address.route';
import CityRoute from './app/routes/city.route';
import ClientRoute from './app/routes/client.route';
import ProfileRoute from './app/routes/profile.route';
import StateRoute from './app/routes/state.route';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

export class App {
    private express: express.Application;
    private port = 3000;

    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
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

    private routes() {
        this.express.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        
        this.express.use('/users', UserRoute);
        this.express.use('/company', CompanyRoute);
        this.express.use('/address', AddressRoute);
        this.express.use('/city', CityRoute);
        this.express.use('/client', ClientRoute);
        this.express.use('/profile', ProfileRoute);
        this.express.use('/state', StateRoute);
    }
}