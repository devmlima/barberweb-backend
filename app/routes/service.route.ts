import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import serviceController from "../controllers/service.controller";

const ServiceRoute = Router();

ServiceRoute.get('/find', authMiddleware, serviceController.find);
ServiceRoute.get('/findById/:id', authMiddleware, serviceController.findById);
ServiceRoute.put('/update', authMiddleware, serviceController.update);
ServiceRoute.delete('/delete/:id', authMiddleware, serviceController.delete);
ServiceRoute.post('/create', authMiddleware, serviceController.create);

export default ServiceRoute;

