import { Client, IClient } from '../models/client.model';
import { Request, Response } from "express";
import { get } from 'lodash';

class ClientController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const client = await Client.findAll();
      return response.status(200).json(client);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, 'params.id', null);
    
    try {
      const client = await Client.findOne({ where: { id } as any });
      return response.status(200).json(client);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: IClient = request.body;

    try {
      await Client.update(body, {
        where: { id: body.id } as any,
      });
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).send("Erro ao atualizar registro");
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const client = await Client.findOne({ where: { id: id } as any });
      client.destroy();
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;

    try {
      const instance = await Client.create(body as any);
      return response.status(200).json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new ClientController();
