import { authMiddleware } from './../shared/authenticate';
import { Router } from "express";
import userController from "../controllers/user.controller";

const UserRoute = Router();

UserRoute.get('/find', authMiddleware, userController.find);
UserRoute.get('/findById/:id', authMiddleware, userController.findById);
UserRoute.put('/update', authMiddleware, userController.update);
UserRoute.delete('/delete/:id', authMiddleware, userController.delete);
UserRoute.post('/create', userController.create);
UserRoute.post('/signUp', userController.signUp);
UserRoute.post('/login', userController.login);

export default UserRoute;

