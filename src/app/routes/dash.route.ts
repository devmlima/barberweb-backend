import { authMiddleware, authPermitions } from '../shared/authenticate';
import { Router } from "express";
import dashController from '../controllers/dash.controller';

const DashboardRoute = Router();

DashboardRoute.get('/cutsAll', authMiddleware, authPermitions, dashController.cutsAll);
DashboardRoute.get('/faturamentAll', authMiddleware, authPermitions, dashController.faturamentAll);
DashboardRoute.get('/userMonth', authMiddleware, authPermitions, dashController.userMonth);
DashboardRoute.get('/faturamentForUser', authMiddleware, authPermitions, dashController.faturamentForUser);
DashboardRoute.get('/faturamentLastSevenDays', authMiddleware, authPermitions, dashController.faturamentLastSevenDays);

export default DashboardRoute;
