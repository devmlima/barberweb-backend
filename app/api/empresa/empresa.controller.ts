import { Request, Response } from "express";
import { knex } from "knex";

interface IEmpresa {
    id: number;
    cpfCnpj: string;
    enderecoId: string;
    razaoSocial: string;
    nomeFantasia: string;
    telefone: string;
    dataInclusao: Date;
    dataAlteracao: Date;
  }

class EmpresaController {
  async findById(request: Request, response: Response) {
    const id = request.query;
    const user = await knex("empresa").where("id", id).select("empresa.*");

    return response.json(user);
  }

  async findAll(request: Request, response: Response) {
    const user = await knex("empresa").select("empresa.*");

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const body: IEmpresa = request.body;
    const params = {
      cpf_cnpj: body.cpfCnpj,
      endereco_id: body.enderecoId,
      razao_social: body.razaoSocial,
      telefone: body.telefone,
    };
    const instance = await knex("empresa").insert(params);

    return response.json(instance);
  }

  async update(request: Request, response: Response) {
    const body: IEmpresa = request.body;
    const params = {
      id: body.id,
      cpf_cnpj: body.cpfCnpj,
      endereco_id: body.enderecoId,
      razao_social: body.razaoSocial,
      telefone: body.telefone,
    };

    const instance = await knex("empresa")
      .where({ id: params.id })
      .update(params);

    return response.json(instance);
  }

  async delete(request: Request, response: Response) {
    const id = request.body;
    const instance = await knex("empresa").where({ id }).del();

    return response.json(instance);
  }
}

export default EmpresaController;
