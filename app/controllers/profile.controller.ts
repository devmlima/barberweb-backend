import { Profile, IProfile } from '../models/profile.model';
import { Request, Response } from "express";

class ProfileController {
  async findAll(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const profile = await Profile.findAll();
      return response.json(profile);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;
    
    try {
      const user = await Profile.findOne({ where: { id } as any });
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: IProfile = request.body;

    try {
      const instance = await Profile.update(body, {
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
      const instance = await Profile.destroy({ where: id } as any);
      return response.json(instance);
    } catch (e) {
      return response.status(500).send("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;

    try {
      const instance = await Profile.create(body as any);
      return response.json(instance);
    } catch (e) {
      console.log(e);
      return response.status(500).send("Erro ao criar registro");
    }
  }
}

export default new ProfileController();
