import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import profileController from "../controllers/profile.controller";

const ProfileRoute = Router();

ProfileRoute.get('/find', authMiddleware, profileController.findAll);
ProfileRoute.get('/findById/:id', authMiddleware, profileController.findById);
ProfileRoute.put('/update', authMiddleware, profileController.update);
ProfileRoute.delete('/delete/:id', authMiddleware, profileController.delete);
ProfileRoute.post('/create', authMiddleware, profileController.create);

export default ProfileRoute;

