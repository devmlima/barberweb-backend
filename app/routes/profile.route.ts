import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import profileController from "../controllers/profile.controller";

const ProfileRoute = Router();

ProfileRoute.get('/findAll', profileController.findAll);
ProfileRoute.get('/findById', profileController.findById);
ProfileRoute.put('/update', profileController.update);
ProfileRoute.delete('/delete/:id', profileController.delete);
ProfileRoute.post('/create', profileController.create);

export default ProfileRoute;

