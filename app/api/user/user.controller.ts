import { BadRequestException } from "./../../shared/exceptions";

import { Request, Response } from "express";
import knex from "knex";
import UserProvider from "./user.service";

interface IUser {
  id: number;
  empresaId: number;
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
      empresa_id: body.empresaId,
    };
    const instance = await knex("users").insert(params);

    return response.json(instance);
  }

  async update(request: Request, response: Response) {
    const body: IUser = request.body;
    const params = {
      id: body.id,
      nome: body.nome,
      cpf: body.cpf,
      email: body.email,
      celular: body.celular,
      senha: body.senha,
      data_nascimento: body.dataNascimento,
      empresa_id: body.empresaId,
    };

    const instance = await knex("users")
      .where({ id: params.id })
      .update(params);

    return response.json(instance);
  }

  async delete(request: Request, response: Response) {
    const id = request.body;
    const instance = await knex("users").where({ id }).del();

    return response.json(instance);
  }

  async login(request: Request, response: Response) {
    const body: any = request.body;

    if (!body) throw new BadRequestException("Dados de usuário não informado!");
    if (!body.email) throw new BadRequestException("Email não informado!");
    if (!body.senha) throw new BadRequestException("Senha não informada!");

    const user = await knex("users")
      .where("email", body.email)
      .select("users.*");
    const validate = await UserProvider.validateToken(body.token);
    console.log(user);
  }
}

export default UserController;
