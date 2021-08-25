import { Request, Response } from "express";
import { knex } from "knex";

class EstadoController {
  async findById(request: Request, response: Response) {
    const id = request.query;
    const user = await knex("estados").where("id", id).select("estados.*");

    return response.json(user);
  }

  async findAll(request: Request, response: Response) {
    const user = await knex("estados").select("estados.*");

    return response.json(user);
  }
}

export default EstadoController;
