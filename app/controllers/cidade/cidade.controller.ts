import { Request, Response } from "express";
import { knex } from "knex";

class CidadeController {
  async findById(request: Request, response: Response) {
    const id = request.query;
    const user = await knex("cidade").where("id", id).select("cidade.*");

    return response.json(user);
  }

  async findAll(request: Request, response: Response) {
    const user = await knex("cidade").select("cidade.*");

    return response.json(user);
  }
}

export default CidadeController;
