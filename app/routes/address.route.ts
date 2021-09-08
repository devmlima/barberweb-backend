import { authMiddleware } from '../shared/authenticate';
import { Router } from "express";
import addressController from "../controllers/address.controller";

const AddressRoute = Router();

AddressRoute.get('/find', authMiddleware, addressController.findAll);
AddressRoute.get('/findById', authMiddleware, addressController.findById);
AddressRoute.put('/update', authMiddleware, addressController.update);
AddressRoute.delete('/delete/:id', authMiddleware, addressController.delete);
AddressRoute.post('/create', authMiddleware, addressController.create);

export default AddressRoute;

