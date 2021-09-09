import { State, IState } from '../models/state.model';
import { Request, Response } from "express";
import { get } from 'lodash';

class StateController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const state = await State.findAll();
      return response.json(state);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, 'params.id', null);
    
    try {
      const user = await State.findOne({ where: { id } as any });
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: IState = request.body;

    try {
      const instance = await State.update(body, {
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
      const instance = await State.destroy({ where: id } as any);
      return response.json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;

    try {
      const instance = await State.create(body as any);
      return response.json(instance);
    } catch (e) {
      console.log(e);
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new StateController();
