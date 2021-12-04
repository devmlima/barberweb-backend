import { authMiddleware, authPermitions } from '../shared/authenticate';
import { Router } from "express";
import clientController from "../controllers/client.controller";

const ClientRoute = Router();

ClientRoute.get('/searchCep', authMiddleware, authPermitions, clientController.searchCep);
ClientRoute.get('/find', authMiddleware, authPermitions, clientController.findAll);
ClientRoute.get('/findById/:id', authMiddleware, authPermitions, clientController.findById);
ClientRoute.put('/update', authMiddleware, authPermitions, clientController.update);
ClientRoute.delete('/delete/:id', authMiddleware, authPermitions, clientController.delete);
ClientRoute.post('/create', authMiddleware, authPermitions, clientController.create);

export default ClientRoute;

