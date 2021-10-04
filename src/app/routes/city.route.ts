import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import cityController from "../controllers/city.controller";

const CityRoute = Router();

CityRoute.get('/find', authMiddleware, cityController.findAll);
CityRoute.get('/findById/:id', authMiddleware, cityController.findById);

export default CityRoute;

