import { State, IState } from '../models/state.model';
import { Request, Response } from "express";
import { get } from 'lodash';

class StateController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const state = await State.findAll();
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
