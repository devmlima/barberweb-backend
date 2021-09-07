import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import cityController from "../controllers/city.controller";

const CityRoute = Router();

CityRoute.get('/findAll', cityController.findAll);
CityRoute.get('/findById', cityController.findById);
CityRoute.put('/update', cityController.update);
CityRoute.delete('/delete/:id', cityController.delete);
CityRoute.post('/create', cityController.create);

export default CityRoute;

