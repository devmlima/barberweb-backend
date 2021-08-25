import { Request, Response } from "express";
import { knex } from "knex";

interface IEndereco {
  id: number;
  empresaId: number;
  rua: string;
  numero: number;
  cep: string;
  estadoId: string;
  cidadeId: string;
  dataInclusao: Date;
  dataAlteracao: Date;
}

class EnderecoController {
  async findById(request: Request, response: Response) {
    const id = request.query;
    const user = await knex("endereco").where("id", id).select("endereco.*");

    return response.json(user);
  }

  async findAll(request: Request, response: Response) {
    const user = await knex("endereco").select("endereco.*");

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const body: IEndereco = request.body;
    const params = {
      rua: body.rua,
      numero: body.numero,
      cep: body.cep,
      estado_id: body.estadoId,
      cidade_id: body.cidadeId,
      empresa_id: body.empresaId,
    };
    const instance = await knex("endereco").insert(params);

    return response.json(instance);
  }

  async update(request: Request, response: Response) {
    const body: IEndereco = request.body;
    const params = {
      id: body.id,
      rua: body.rua,
      numero: body.numero,
      cep: body.cep,
      estado_id: body.estadoId,
      cidade_id: body.cidadeId,
      empresa_id: body.empresaId,
    };

    const instance = await knex("endereco")
      .where({ id: params.id })
      .update(params);

    return response.json(instance);
  }

  async delete(request: Request, response: Response) {
    const id = request.body;
    const instance = await knex("endereco").where({ id }).del();

    return response.json(instance);
  }
}

export default EnderecoController;
