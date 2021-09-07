import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import addressController from "../controllers/address.controller";

const AddressRoute = Router();

AddressRoute.get('/findAll', addressController.findAll);
AddressRoute.get('/findById', addressController.findById);
AddressRoute.put('/update', addressController.update);
AddressRoute.delete('/delete/:id', addressController.delete);
AddressRoute.post('/create', addressController.create);

export default AddressRoute;

