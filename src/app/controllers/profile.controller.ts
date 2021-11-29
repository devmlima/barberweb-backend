import { Op } from './../../database';
import { Profile, IProfile } from "../models/profile.model";
import { Request, Response } from "express";
import { get } from "lodash";

class ProfileController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;
    const userLogged: any = request.headers.userLogged;

    try {
      const profile = await Profile.findAll({
        where: { empresaId: userLogged.empresaId },
      } as any);
      return response.status(200).json(profile);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const profile = await Profile.findOne({ where: { id } as any });
      return response.status(200).json(profile);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: IProfile = request.body;

    try {
      await Profile.update(body, {
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
      const profile = await Profile.findOne({ where: { id: id } as any });
      profile.destroy();
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    const companyId: any = request.headers.companyId;
    const userLogged: any = request.headers.userLogged;

    try {
      const object = {
        id: body.id,
        permissoes: body.permissoes,
        empresaId: companyId,
        descricao: body.descricao,
      };

      let instanceProfile = await Profile.findOne({
        where: { descricao: { [Op.iLike]: body.descricao } } as any,
      });

      if (instanceProfile) {
        response
          .status(401)
          .json("Já existe um perfil cadastrado com a descrição informada!");
        return;
      }

      const instance = await Profile.create(object as any);
      return response.status(200).json(instance);
    } catch (e) {
      console.error(e);
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new ProfileController();
