import { Request, Response } from "express";
import { get } from "lodash";
import { Op } from "../../database";
import { Client } from "../models/client.model";
import { ISchedule, Schedule } from "../models/schedule.model";
import { CutsMade } from './../models/cutsMade.model';
import { Service } from './../models/service.model';

class ScheduleController {
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

    if (query && query.clienteId) {
      where.clienteId = query.clienteId;
    }

    if (query && query.usuarioId) {
      where.usuarioId = query.usuarioId;
    }

    if (query && query.cancelado) {
      where.cancelado = query.cancelado;
    }

    if (
      query &&
      (query.confirmado === "true" ||
        query.confirmado === true ||
        query.confirmado === "false" ||
        query.confirmado === false)
    ) {
      where.confirmado = query.confirmado;
    }

    if (query && query.dataOperacao) {
      where.dataOperacao = query.dataOperacao;
    }

    try {
      const schedule = await Schedule.findAll({
        where,
        limit: 30,
        offset: 0,
        include: [Client, Service],
        order: [['dataAlteracao', 'desc']]
      });
      return response.status(200).json(schedule);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const schedule = await Schedule.findOne({ where: { id }, include: [Client, Service] as any });
      return response.status(200).json(schedule);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: ISchedule = request.body;

    try {
      await Schedule.update(body, {
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
      const schedule = await Schedule.findOne({ where: { id: id } as any });
      schedule.destroy();
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    const userLogged: any = request.headers.userLogged;
    body.empresaId = userLogged.empresaId;
    body.usuarioId = userLogged.id;

    try {
      const instance = await Schedule.create(body as any);
      return response.status(200).json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }
  }

  async scheduleMade(request: Request, response: Response): Promise<Response> {
    try {
      await CutsMade.create(request.body);
    } catch (error) {
      throw new Error("Erro ao realizar o corte");
    }

    return;
  }
}

export default new ScheduleController();
