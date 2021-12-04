import { authMiddleware, authPermitions } from '../shared/authenticate';
import { Router } from "express";
import profileController from "../controllers/profile.controller";

const ProfileRoute = Router();

ProfileRoute.get('/find', authMiddleware, authPermitions, profileController.findAll);
ProfileRoute.get('/findById/:id', authMiddleware, authPermitions, profileController.findById);
ProfileRoute.put('/update', authMiddleware, authPermitions, profileController.update);
ProfileRoute.delete('/delete/:id', authMiddleware, authPermitions, profileController.delete);
ProfileRoute.post('/create', authMiddleware, authPermitions, profileController.create);

export default ProfileRoute;

