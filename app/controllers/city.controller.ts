import { City, ICity } from './../models/city.model';
import { Request, Response } from "express";
import { get } from 'lodash';

class CityController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const city = await City.findAll();
      return response.status(200).json(city);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, 'params.id', null);
    
    try {
      const user = await City.findOne({ where: { id } as any });
      return response.status(200).json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }
}

export default new CityController();
