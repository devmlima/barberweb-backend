import { Request, Response } from "express";
import { knex } from "knex";

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
}

export default EnderecoController;
