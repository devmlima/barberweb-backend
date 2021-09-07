import { City, ICity } from './../models/city.model';
import { Request, Response } from "express";

class CityController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const city = await City.findAll();
      return response.json(city);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;
    
    try {
      const user = await City.findOne({ where: { id } as any });
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: ICity = request.body;

    try {
      const instance = await City.update(body, {
        where: { id: body.id } as any,
      });
      return response.json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao atualizar registro");
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    try {
      const instance = await City.destroy({ where: id } as any);
      return response.json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;

    try {
      const instance = await City.create(body as any);
      return response.json(instance);
    } catch (e) {
      console.log(e);
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new CityController();
