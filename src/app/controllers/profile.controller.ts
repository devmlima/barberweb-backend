import { Profile, IProfile } from '../models/profile.model';
import { Request, Response } from "express";
import { get } from 'lodash';

class ProfileController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const profile = await Profile.findAll();
      return response.status(200).json(profile);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, 'params.id', null);
    
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

    try {
      const instance = await Profile.create(body as any);
      return response.status(200).json(instance);
    } catch (e) {
      console.log(e);
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new ProfileController();
