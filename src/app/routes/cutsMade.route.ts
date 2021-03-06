import { Router } from "express";
import cutsMadeController from "../controllers/cutsMade.controller";
import { authMiddleware, authPermitions } from '../shared/authenticate';

const CutsMadeRoute = Router();

CutsMadeRoute.get('/find', authMiddleware, authPermitions, cutsMadeController.find);
CutsMadeRoute.get('/findById/:id', authMiddleware, authPermitions, cutsMadeController.findById);
CutsMadeRoute.put('/update', authMiddleware, authPermitions, cutsMadeController.update);
CutsMadeRoute.delete('/delete/:id', authMiddleware, authPermitions, cutsMadeController.delete);
CutsMadeRoute.post('/create', authMiddleware, authPermitions, cutsMadeController.create);
CutsMadeRoute.post('/print', authMiddleware, authPermitions, cutsMadeController.print);

export default CutsMadeRoute;

