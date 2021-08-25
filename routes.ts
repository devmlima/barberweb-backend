import { authMiddleware } from "./app/shared/authenticate";
import express from "express";

import ClienteController from "./app/api/cliente/cliente.controller";
import EmpresaController from "./app/api/empresa/empresa.controller";
import PerfilController from "./app/api/perfil/perfil.controller";
import UserController from "./app/api/user/user.controller";
import EstadoController from "./app/api/estado/estado.controller";
import CidadeController from "./app/api/cidade/cidade.controller";
import EnderecoController from "./app/api/endereco/endereco.controller";

const userController = new UserController();
const empresaController = new EmpresaController();
const clienteController = new ClienteController();
const perfilController = new PerfilController();
const estadoController = new EstadoController();
const cidadeController = new CidadeController();
const enderecoController = new EnderecoController();

const routes = express.Router();

routes.get("/user/findById/:id", authMiddleware, userController.findById);
routes.post("/user/create", authMiddleware, userController.create);
routes.put("/user/update", authMiddleware, userController.update);
routes.delete("/user/delete", authMiddleware, userController.delete);

routes.get("/empresa/findById/:id", authMiddleware, empresaController.findById);
routes.post("/empresa/create", authMiddleware, empresaController.create);
routes.put("/empresa/update", authMiddleware, empresaController.update);
routes.delete("/empresa/delete", authMiddleware, empresaController.delete);

routes.get("/cliente/findById/:id", authMiddleware, clienteController.findById);
routes.post("/cliente/create", authMiddleware, clienteController.create);
routes.put("/cliente/update", authMiddleware, clienteController.update);
routes.delete("/cliente/delete", authMiddleware, clienteController.delete);

routes.get("/perfil/findById/:id", authMiddleware, perfilController.findById);
routes.post("/perfil/create", authMiddleware, perfilController.create);
routes.put("/perfil/update", authMiddleware, perfilController.update);
routes.delete("/perfil/delete", authMiddleware, perfilController.delete);

routes.get(
  "/endereco/findById/:id",
  authMiddleware,
  enderecoController.findById
);
routes.post("/endereco/create", authMiddleware, enderecoController.create);
routes.put("/endereco/update", authMiddleware, enderecoController.update);
routes.delete("/endereco/delete", authMiddleware, enderecoController.delete);

routes.put("/estado/update", authMiddleware, estadoController.findAll);
routes.delete("/estado/delete", authMiddleware, estadoController.findById);

routes.put("/cidade/update", authMiddleware, cidadeController.findAll);
routes.delete("/cidade/delete", authMiddleware, cidadeController.findById);

export default routes;
