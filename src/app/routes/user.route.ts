import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import userController from "../controllers/user.controller";

const UserRoute = Router();

UserRoute.get('/find', authMiddleware, userController.find);
UserRoute.get('/findById/:id', authMiddleware, userController.findById);
UserRoute.put('/update', authMiddleware, userController.update);
UserRoute.delete('/delete/:id', authMiddleware, userController.delete);
UserRoute.post('/create', authMiddleware, userController.create);
UserRoute.post('/signUp', userController.signUp);
UserRoute.post('/login', userController.login);
UserRoute.get('/verifyToken', authMiddleware, userController.verifyToken);

UserRoute.get('/dataUser/', authMiddleware, userController.dataUser);

export default UserRoute;
