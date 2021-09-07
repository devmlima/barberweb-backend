import { authMiddleware } from "../shared/authenticate";
import { Router } from "express";
import stateController from "../controllers/state.controller";

const StateRoute = Router();

StateRoute.get("/findAll", authMiddleware, stateController.findAll);
StateRoute.get("/findById", authMiddleware, stateController.findById);
StateRoute.put("/update", authMiddleware, stateController.update);
StateRoute.delete("/delete/:id", authMiddleware, stateController.delete);
StateRoute.post("/create", authMiddleware, stateController.create);

export default StateRoute;
