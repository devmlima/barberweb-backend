import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from '../shared/authenticate';

const UserRoute = Router();

UserRoute.get('/find', authMiddleware, userController.find);
UserRoute.get('/findById/:id', authMiddleware, userController.findById);
UserRoute.get('/verifyToken', authMiddleware, userController.verifyToken);
UserRoute.get('/dataUser/', authMiddleware, userController.dataUser);

UserRoute.delete('/delete/:id', authMiddleware, userController.delete);

UserRoute.put('/update', authMiddleware, userController.update);

UserRoute.post('/create', authMiddleware, userController.create);
UserRoute.post('/signUp', userController.signUp);
UserRoute.post('/login', userController.login);
UserRoute.post('/updatePassword', authMiddleware, userController.updatePassword);

export default UserRoute;
