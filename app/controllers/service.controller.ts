import { IService, Service } from "./../models/service.model";
import { Response } from "express";
import { Request } from "express";
import { get } from "lodash";

class ServiceController {
  async find(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const company = await Service.findAll({
        where: {
          // empresaId: request.userLogged.empresaId
        },
      } as any);
      return response.json(company);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const user = await Service.findOne({ where: { id } as any });
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: IService = request.body;
    const userLogged: any = request.headers.userLogged;
    
    try {
      await Service.update(body, {
        where: { id: body.id } as any,
      });
      return response.json(true);
    } catch (e) {
      return response.status(500).send("Erro ao atualizar registro");
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    try {
      const service = await Service.findOne({ where: { id: id } });
      service.destroy();
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    const userLogged: any = request.headers.userLogged;

    try {
      const params: any = {
        descricao: body.descricao,
        empresaId: userLogged.empresaId,
      };

      const instance = await Service.create(params as any);
      return response.status(200).json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new ServiceController();
