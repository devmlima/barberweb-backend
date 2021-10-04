import { authMiddleware } from "../shared/authenticate";
import { Router } from "express";
import stateController from "../controllers/state.controller";

const StateRoute = Router();

StateRoute.get("/find", authMiddleware, stateController.findAll);
StateRoute.get("/findById", authMiddleware, stateController.findById);

export default StateRoute;
