import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import clientController from "../controllers/client.controller";

const ClientRoute = Router();

ClientRoute.get('/find', authMiddleware, clientController.findAll);
ClientRoute.get('/findById', authMiddleware, clientController.findById);
ClientRoute.put('/update', authMiddleware, clientController.update);
ClientRoute.delete('/delete/:id', authMiddleware, clientController.delete);
ClientRoute.post('/create', authMiddleware, clientController.create);

export default ClientRoute;

