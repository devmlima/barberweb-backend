import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import cityController from "../controllers/city.controller";

const CityRoute = Router();

CityRoute.get('/findAll', authMiddleware, cityController.findAll);
CityRoute.get('/findById', authMiddleware, cityController.findById);
CityRoute.put('/update', authMiddleware, cityController.update);
CityRoute.delete('/delete/:id', authMiddleware, cityController.delete);
CityRoute.post('/create', authMiddleware, cityController.create);

export default CityRoute;

