import express from "express";

import ClienteController from "./app/controllers/cliente/cliente.controller";
import EmpresaController from "./app/controllers/empresa/empresa.controller";
import PerfilController from "./app/controllers/perfil/perfil.controller";
import UserController from "./app/controllers/user/user.controller";
import EstadoController from "./app/controllers/estado/estado.controller";
import CidadeController from "./app/controllers/cidade/cidade.controller";
import EnderecoController from "./app/controllers/endereco/endereco.controller";

const userController = new UserController();
const empresaController = new EmpresaController();
const clienteController = new ClienteController();
const perfilController = new PerfilController();
const estadoController = new EstadoController();
const cidadeController = new CidadeController();
const enderecoController = new EnderecoController();

const routes = express.Router();

routes.get("/user/findById/:id", userController.findById);
routes.post("/user/create", userController.create);
routes.put("/user/update", userController.update);
routes.delete("/user/delete", userController.delete);

routes.get("/empresa/findById/:id", empresaController.findById);
routes.post("/empresa/create", empresaController.create);
routes.put("/empresa/update", empresaController.update);
routes.delete("/empresa/delete", empresaController.delete);

routes.get("/cliente/findById/:id", clienteController.findById);
routes.post("/cliente/create", clienteController.create);
routes.put("/cliente/update", clienteController.update);
routes.delete("/cliente/delete", clienteController.delete);

routes.get("/perfil/findById/:id", perfilController.findById);
routes.post("/perfil/create", perfilController.create);
routes.put("/perfil/update", perfilController.update);
routes.delete("/perfil/delete", perfilController.delete);

routes.get("/endereco/findById/:id", enderecoController.findById);
routes.post("/endereco/create", enderecoController.create);
routes.put("/endereco/update", enderecoController.update);
routes.delete("/endereco/delete", enderecoController.delete);

routes.put("/estado/update", estadoController.findAll);
routes.delete("/estado/delete", estadoController.findById);

routes.put("/cidade/update", cidadeController.findAll);
routes.delete("/cidade/delete", cidadeController.findById);

export default routes;