import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import cityController from "../controllers/city.controller";

const CityRoute = Router();

CityRoute.get('/findAll', authMiddleware, cityController.findAll);
CityRoute.get('/findById', authMiddleware, cityController.findById);

export default CityRoute;

