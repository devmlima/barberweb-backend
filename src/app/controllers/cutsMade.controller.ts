import { Client } from './../models/client.model';
import { Service } from './../models/service.model';
import { User } from './../models/user.model';
import { Schedule } from './../models/schedule.model';
import { ICutsMade, CutsMade } from "../models/cutsMade.model";
import { Response } from "express";
import { Request } from "express";
import { get } from "lodash";
import { Op } from "../../database";

class CutsMadeController {
  async find(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;
    const userLogged: any = request.headers.userLogged;
    const where: any = {};

    where.empresaId = userLogged.empresaId;

    if (query && query.id) {
      where.id = query.id;
    }

    if (query && query.descricao) {
      where.descricao = { [Op.iLike]: `%${query.descricao}%` };
    }

    try {
      const cutsMade = await CutsMade.findAll({
        where,
        limit: 30,
        include: [Client, Service, User], 
        order: [['dataAlteracao', 'desc']] 
      } as any);
      return response.json(cutsMade);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const user = await CutsMade.findOne({ where: { id } as any });
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: ICutsMade = request.body;
    const userLogged: any = request.headers.userLogged;

    try {
      await CutsMade.update(body, {
        where: { id: body.id, empresaId: userLogged.empresaId } as any,
      });
      return response.json(true);
    } catch (e) {
      return response.status(500).send("Erro ao atualizar registro");
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const cutsMade = await CutsMade.findOne({ where: { id: id } });
      cutsMade.destroy();
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    const userLogged: any = request.headers.userLogged;
    const param: ICutsMade = {
      descricao: '',
      empresaId: null,
      usuarioId: null,
      clienteId: null,
      servicoId: null,
      valor: null,
      formaPagamentoId: null,
      cancelado: false,
      hora: '',
      data: '',
    }

    
    try {
        body.empresaId = userLogged.empresaId;
        body.usuarioId = userLogged.id;
        body.formaPagamentoId = null;

        const obj = Object.assign(param, body);

      const instance = await CutsMade.create(obj as any);
      await Schedule.update({ confirmado: true } as any, { where: { id: body.agendamentoId } });
      return response.status(200).json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new CutsMadeController();
