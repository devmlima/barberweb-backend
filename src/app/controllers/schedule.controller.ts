import { Request, Response } from "express";
import { parse } from 'json2csv';
import { get } from "lodash";
import { tmpdir } from 'os';
import { Op } from "../../database";
import { Client } from "../models/client.model";
import { ISchedule, Schedule } from "../models/schedule.model";
import { CutsMade } from './../models/cutsMade.model';
import { Service } from './../models/service.model';
import { savePDFS3 } from './../shared/aws';
import fs = require('fs');
import util = require('util');
const writeFile = util.promisify(fs.writeFile);
const readfilePromise = util.promisify(fs.readFile);

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

  async excel(request: Request, response: Response): Promise<Response> {
    try {
      const where: any = {};
      const userLogged: any = request.headers.userLogged;
      where.empresaId = userLogged.empresaId;

      const schedules = await Schedule.findAll({
        where,
        include: [Client, Service],
        order: [['dataAlteracao', 'desc']]
      });

      const arr = [];

      for (const schedule of schedules) {
        arr.push({
          'SERVIÇO': schedule.service.descricao,
          'CLIENTE': schedule.client.nome,
          'DATA': schedule.dataOperacao,
          'HORA': schedule.hora,
          'VALOR': String(schedule.valor).replace('.', ','),
          'REALIZADO': schedule.confirmado,
          'CANCELADO': schedule.cancelado
        });
      }

      const path = `${tmpdir()}/agenda-${new Date().getMilliseconds()}.csv`;

      const rows = parse(arr, {
        delimiter: ';',
        withBOM: true
      });

      await writeFile(`${path}`, rows, { encoding: 'utf8' });
      const buffer = await readfilePromise(`${path}`);
      const name = `agenda-${new Date().getMilliseconds()}.csv`;
      const bucket = 'barberweb/agendas';
      const url = await savePDFS3(buffer, 'json', name, bucket);
      
      return response.status(200).json(url);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }

    return;
  }
}

export default new ScheduleController();
