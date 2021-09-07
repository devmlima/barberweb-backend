import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import clientController from "../controllers/client.controller";

const ClientRoute = Router();

ClientRoute.get('/findAll', clientController.findAll);
ClientRoute.get('/findById', clientController.findById);
ClientRoute.put('/update', clientController.update);
ClientRoute.delete('/delete/:id', clientController.delete);
ClientRoute.post('/create', clientController.create);

export default ClientRoute;

