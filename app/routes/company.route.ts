import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import companyController from "../controllers/company.controller";

const CompanyRoute = Router();

CompanyRoute.get('/findAll', authMiddleware, companyController.findAll);
CompanyRoute.get('/findById', authMiddleware, companyController.findById);
CompanyRoute.put('/update', authMiddleware, companyController.update);
CompanyRoute.delete('/delete/:id', authMiddleware, companyController.delete);
CompanyRoute.post('/create', authMiddleware, companyController.create);

export default CompanyRoute;

