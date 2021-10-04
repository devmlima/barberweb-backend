import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import scheduleController from "../controllers/schedule.controller";

const ScheduleRoute = Router();

ScheduleRoute.get('/find', authMiddleware, scheduleController.findAll);
ScheduleRoute.get('/findById/:id', authMiddleware, scheduleController.findById);
ScheduleRoute.put('/update', authMiddleware, scheduleController.update);
ScheduleRoute.delete('/delete/:id', authMiddleware, scheduleController.delete);
ScheduleRoute.post('/create', authMiddleware, scheduleController.create);

export default ScheduleRoute;

