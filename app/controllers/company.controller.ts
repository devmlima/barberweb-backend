import { Company, ICompany } from "./../models/company.model";
import { BadRequestException } from "./../shared/exceptions";
import { Request, Response } from "express";
import { get } from "lodash";

class CompanyController {
  async find(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const company = await Company.findAll();
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
    const { id } = request.query;

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

      const company = Company.findOne({
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
