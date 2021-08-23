import { Request, Response } from "express";
import { knex } from "knex";

interface ICliente {
  id: number;
  empresaId: number;
  enderecoId: number;
  nome: string;
  cpf: string;
  celular: string;
  dataInclusao: Date;
  dataAlteracao: Date;
}

class ClienteController {
  async findById(request: Request, response: Response) {
    const id = request.query;
    const user = await knex("clientes").where("id", id).select("clientes.*");

    return response.json(user);
  }

  async findAll(request: Request, response: Response) {
    const user = await knex("clientes").select("clientes.*");

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const body: ICliente = request.body;
    const params = {
      nome: body.nome,
      cpf: body.cpf,
      celular: body.celular,
      endereco_id: body.enderecoId,
      empresa_id: body.empresaId,
    };
    const instance = await knex("users").insert(params);

    return response.json(instance);
  }

  async update(request: Request, response: Response) {
    const body: ICliente = request.body;
    const params = {
      id: body.id,
      nome: body.nome,
      cpf: body.cpf,
      celular: body.celular,
      endereco_id: body.enderecoId,
      empresa_id: body.empresaId,
    };

    const instance = await knex("users")
      .where({ id: params.id })
      .update(params);

    return response.json(instance);
  }
}

export default ClienteController;
