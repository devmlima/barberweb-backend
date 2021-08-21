import { Request, Response } from "express";
import knex from "knex";

interface IUser {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  senha: string;
  dataNascimento: string;
  dataInclusao: Date;
  dataAlteracao: Date;
}

class UserController {
  async findById(request: Request, response: Response) {
    const id = request.query;
    const user = await knex("users").where("id", id).select("users.*");

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const body: IUser = request.body;
    const params = {
      nome: body.nome,
      cpf: body.cpf,
      email: body.email,
      celular: body.celular,
      senha: body.senha,
      data_nascimento: body.dataNascimento,
    };
    const instance = await knex("users").insert(params);

    return response.json(instance);
  }

  async delete(request: Request, response: Response) {
    const id = request.body;
    const instance = await knex("users").where({ id }).del();

    return response.json(instance);
  }
}

export default UserController;
