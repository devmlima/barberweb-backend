import { Address, IAddress } from './../models/address.model';
import { BadRequestException } from "../shared/exceptions";
import { Request, Response } from "express";
import { get } from 'lodash';

class AddressController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const address = await Address.findAll();
      return response.json(address);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, 'params.id', null);
    
    try {
      const user = await Address.findOne({ where: { id } as any });
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: IAddress = request.body;

    try {
      const instance = await Address.update(body, {
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
      const instance = await Address.destroy({ where: id } as any);
      return response.json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;

    try {
      const params: any = {
        rua: body.rua,
        numero: body.numero,
        cep: body.cep,
        estadoId: body.estadoId,
        cidadeId: body.cidadeId,
        empresaId: body.empresaId,
      };

      const instance = await Address.create(params as any);
      return response.json(instance);
    } catch (e) {
      console.log(e);
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new AddressController();
