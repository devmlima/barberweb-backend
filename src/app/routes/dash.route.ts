import { Router } from "express";
import dashController from '../controllers/dash.controller';
import { authMiddleware, authPermitions } from '../shared/authenticate';

const DashboardRoute = Router();

DashboardRoute.get('/cutsAll', authMiddleware, authPermitions, dashController.cutsAll);
DashboardRoute.get('/faturamentAll', authMiddleware, authPermitions, dashController.faturamentAll);
DashboardRoute.get('/userMonth', authMiddleware, authPermitions, dashController.userMonth);
DashboardRoute.get('/faturamentForUser', authMiddleware, authPermitions, dashController.faturamentForUser);
DashboardRoute.get('/faturamentLastSevenDays', authMiddleware, authPermitions, dashController.faturamentLastSevenDays);
DashboardRoute.get('/servicesMades', authMiddleware, authPermitions, dashController.servicesMades);
DashboardRoute.get('/schedules', authMiddleware, authPermitions, dashController.schedules);
DashboardRoute.get('/schedulesCanceled', authMiddleware, authPermitions, dashController.schedulesCanceled);

// rels
DashboardRoute.get('/relClient', authMiddleware, authPermitions, dashController.relClient);
DashboardRoute.get('/relServices', authMiddleware, authPermitions, dashController.relServices);

export default DashboardRoute;
