import { Client, IClient } from '../models/client.model';
import { Request, Response } from "express";
import { get } from 'lodash';
import { Op } from '../../database';

class ClientController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;
    const userLogged: any = request.headers.userLogged;
    const where: any = {};

    where.empresaId = userLogged.empresaId;

    if (query && query.id) {
      where.id = query.id;
    }

    if (query && query.nome) {
      where.nome = { [Op.iLike]: `%${query.nome}%` };
    }

    if (query && query.cpfCnpj) {
      where.cpfCnpj = { [Op.iLike]: `%${query.cpfCnpj}%` };
    }


    try {
      const client = await Client.findAll({where, limit: 30, offset: 0});
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
    const userLogged: any = request.headers.userLogged;
    body.empresaId = userLogged.empresaId;

    try {
      const instance = await Client.create(body as any);
      return response.status(200).json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new ClientController();
