import { get } from "lodash";
import { Op } from "../../database";
import { Request, Response } from "express";
import { Company, ICompany } from "../models/company.model";

class CompanyController {
  async find(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;
    const where: any = {};

    if (query && query.id) {
      where.id = query.id;
    }

    if (query && query.cpfCnpj) {
      where.cpfCnpj = { [Op.iLike]: `%${query.cpfCnpj}%` };
    }

    if (query && query.razaoSocial) {
      where.razaoSocial = { [Op.iLike]: `%${query.razaoSocial}%` };
    }

    if (query && query.nomeFantasia) {
      where.nomeFantasia = { [Op.iLike]: `%${query.nomeFantasia}%` };
    }

    try {
      const company = await Company.findAll({ where, limit: 30, offset: 0 });
      return response.json(company);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const user = await Company.findOne({ where: { id } as any });
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: ICompany = request.body;
    try {
      await Company.update(body, {
        where: { id: body.id } as any,
      });
      return response.json(true);
    } catch (e) {
      return response.status(500).send("Erro ao atualizar registro");
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const company = await Company.findOne({ where: { id: id } });
      company.destroy();
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;

    try {
      const params: any = {
        cpfCnpj: body.cpfCnpj,
        enderecoId: body.enderecoId,
        razaoSocial: body.razaoSocial,
        nomeFantasia: body.nomeFantasia,
        telefone: body.telefone,
      };

      const company = await Company.findOne({
        where: { cpfCnpj: params.cpfCnpj } as any,
      });

      if (company) {
        return response.status(401).json("Empresa já cadastrada!");
      }
      const instance = await Company.create(params as any);
      return response.status(200).json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new CompanyController();
