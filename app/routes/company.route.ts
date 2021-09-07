import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import companyController from "../controllers/company.controller";

const CompanyRoute = Router();

CompanyRoute.get('/findAll', companyController.findAll);
CompanyRoute.get('/findById', companyController.findById);
CompanyRoute.put('/update', companyController.update);
CompanyRoute.delete('/delete/:id', companyController.delete);
CompanyRoute.post('/create', companyController.create);

export default CompanyRoute;

