import { authMiddleware, authPermitions } from '../shared/authenticate';
import { Router } from "express";
import serviceController from "../controllers/service.controller";

const ServiceRoute = Router();

ServiceRoute.get('/find', authMiddleware, authPermitions, serviceController.find);
ServiceRoute.get('/findById/:id', authMiddleware, authPermitions, serviceController.findById);
ServiceRoute.put('/update', authMiddleware, authPermitions, serviceController.update);
ServiceRoute.delete('/delete/:id', authMiddleware, authPermitions, serviceController.delete);
ServiceRoute.post('/create', authMiddleware, authPermitions, serviceController.create);

export default ServiceRoute;

