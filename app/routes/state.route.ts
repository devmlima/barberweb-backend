import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import stateController from "../controllers/state.controller";

const StateRoute = Router();

StateRoute.get('/findAll', stateController.findAll);
StateRoute.get('/findById', stateController.findById);
StateRoute.put('/update', stateController.update);
StateRoute.delete('/delete/:id', stateController.delete);
StateRoute.post('/create', stateController.create);

export default StateRoute;

