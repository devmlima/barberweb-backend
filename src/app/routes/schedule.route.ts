import { Router } from "express";
import scheduleController from "../controllers/schedule.controller";
import { authMiddleware, authPermitions } from '../shared/authenticate';

const ScheduleRoute = Router();

ScheduleRoute.get('/find', authMiddleware, authPermitions, scheduleController.findAll);
ScheduleRoute.get('/findById/:id', authMiddleware, authPermitions, scheduleController.findById);
ScheduleRoute.put('/update', authMiddleware, authPermitions, scheduleController.update);
ScheduleRoute.delete('/delete/:id', authMiddleware, authPermitions, scheduleController.delete);
ScheduleRoute.post('/create', authMiddleware, authPermitions, scheduleController.create);
ScheduleRoute.post('/excel', authMiddleware, authPermitions, scheduleController.excel);

export default ScheduleRoute;

