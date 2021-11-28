import { State, IState } from '../models/state.model';
import { Request, Response } from "express";
import { get } from 'lodash';
import { Op } from "../../database";

class StateController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = JSON.parse(get(request, "query.filter", ""));

    const { where, limit }: any = query;

    if (query && query.descricao) {
      where.descricao = { [Op.iLike]: `%${query.descricao}%` };
    }
    
    if (query && query.sigla) {
      where.sigla = query.sigla;
    }

    try {
      const state = await State.findAll({ where, limit, offset: 0 });
      return response.status(200).json(state);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, 'params.id', null);
    
    try {
      const state = await State.findOne({ where: { id } as any });
      return response.status(200).json(state);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }
}

export default new StateController();
