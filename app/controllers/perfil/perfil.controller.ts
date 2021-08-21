import { Request, Response } from "express";
import knex from "knex";

interface IPerfil {
  id: number;
  permissoes: string;
  usuarioId: number;
  dataInclusao: Date;
  dataAlteracao: Date;
}

class UserController {
  async findById(request: Request, response: Response) {
    const usuario = request.query;
    const user = await knex("perfil")
      .where("usuario_id", usuario)
      .select("perfil.*");

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const body: IPerfil = request.body;
    const params = {
      permissoes: body.permissoes,
      usuario_id: body.usuarioId,
    };
    const instance = await knex("perfil").insert(params);

    return response.json(instance);
  }

  async update(request: Request, response: Response) {
    const body: IPerfil = request.body;
    const params = {
      permissoes: body.permissoes,
      usuario_id: body.usuarioId,
    };

    const instance = await knex("perfil")
      .where({ usuario_id: params.usuario_id })
      .update(params);

    return response.json(instance);
  }

  async delete(request: Request, response: Response) {
    const usuario = request.body;
    const instance = await knex("perfil").where({ usuario_id: usuario }).del();

    return response.json(instance);
  }
}

export default UserController;
