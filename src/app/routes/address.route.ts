import { authMiddleware, authPermitions } from '../shared/authenticate';
import { Router } from "express";
import addressController from "../controllers/address.controller";

const AddressRoute = Router();

AddressRoute.get('/find', authMiddleware, authPermitions, addressController.findAll);
AddressRoute.get('/findById/:id', authMiddleware, authPermitions, addressController.findById);
AddressRoute.put('/update', authMiddleware, authPermitions, addressController.update);
AddressRoute.delete('/delete/:id', authMiddleware, authPermitions, addressController.delete);
AddressRoute.post('/create', authMiddleware, authPermitions, addressController.create);

export default AddressRoute;

