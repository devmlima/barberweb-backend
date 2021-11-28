import { Address } from './../models/address.model';
import { City } from './../models/city.model';
import { State } from './../models/state.model';
import { Client, IClient } from "../models/client.model";
import { Request, Response } from "express";
import { get } from "lodash";
import { Op } from "../../database";
import superagent from 'superagent';
class ClientController {
  async searchCep(request: Request, response: Response): Promise<Response> {
    const query: any = JSON.parse(get(request, "query.filter", ""));
    if (!query.cep) return;

    try {
      let cepResponse = await superagent.get(`viacep.com.br/ws/${query.cep}/json/`);
      if (!cepResponse) {
        return response.status(204).json();
      }

      cepResponse = cepResponse.body;
      const state = await State.findOne({ where: { sigla: cepResponse.uf } as any });
      const city = await City.findOne({ where: { estadoId: cepResponse.uf, descricao: cepResponse.localidade } as any });

      const addresInterface = {
        rua: cepResponse.logradouro,
        bairro: cepResponse.bairro,
        estadoId: state,
        cidadeId: city,
      }
      return response.status(200).json(addresInterface);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

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
      const client = await Client.findAll({ where, limit: 30, offset: 0 });
      return response.status(200).json(client);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

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
    const companyId: any = request.headers.companyId;
    body.empresaId = companyId;

    try {
      let instanceClient = await Client.findOne({
        where: { empresaId: companyId, nome: { [Op.iLike]: body.nome } } as any,
      });

      const obj = body.endereco;
      obj.empresaId = companyId;

      const addresInstance = await Address.create(obj as any);
      body.enderecoId = addresInstance.id;
      
      if (instanceClient) {
        response
          .status(401)
          .json("Já existe um cliente cadastrado com o nome cadastrado!");
        return;
      }

      const instance = await Client.create(body as any);
      return response.status(200).json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new ClientController();
