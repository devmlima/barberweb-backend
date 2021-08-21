import express from "express";
import UserController from "./app/controllers/user.controller";

const userController = new UserController();
const routes = express.Router();

routes.get("/user/findById/:id", userController.findById);
routes.post("/user/create", userController.create);
routes.delete("/user/delete", userController.delete);

export default routes;