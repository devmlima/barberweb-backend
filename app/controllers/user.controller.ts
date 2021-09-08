import { BadRequestException } from "./../shared/exceptions";
import { IUser, User } from "./../models/user.model";
import { Request, Response } from "express";

class UserController {
  async find(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;

    try {
      const user = await User.findAll();
      return response.json(user);
    } catch (e) {
      throw new Error("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = request.query;
    try {
      const user = await User.findOne({ where: { id: id } });
      return response.json(user);
    } catch (e) {
      throw new Error("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: IUser = request.body;
    try {
      const instance = await User.update(body, { where: { id: body.id } });
      return response.json(instance);
    } catch (e) {
      throw new Error("Erro ao atualizar registro");
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = request.body;
    try {
      const instance = await User.destroy({ where: id });
      return response.json(instance);
    } catch (e) {
      throw new Error("Erro ao excluir registro");
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const body: IUser = request.body;

    if (!body) throw new BadRequestException("Dados de usuário não informado!");
    if (!body.email) throw new BadRequestException("Email não informado!");
    if (!body.senha) throw new BadRequestException("Senha não informada!");

    const user = await User.findOne({ where: { email: body.email } as any });
    if (!user) throw new BadRequestException("Usuário não encontrado!");

    if (!user.compareSenha(body.senha)) {
      throw new BadRequestException("Senha inválida");
    }

    const instance = user.json();
    const { token } = user.generateToken();

    const result = { ...instance, token };
    return response.json(result);
  }

  async signUp(request: Request, response: Response): Promise<Response> {
    const body = request.body;

    try {
      const params: any = {
        nome: body.nome,
        cpf: body.cpf,
        email: body.email,
        celular: body.celular,
        senha: body.senha,
        dataNascimento: body.dataNascimento,
        empresaId: body.empresaId,
      };

      const instance = await User.create(params as any);
      const { token, expiresIn } = instance.generateToken();

      return response
        .status(200)
        .json({ ...instance.json(), token, expiresIn });
    } catch (e) {
      console.log(e);
      throw new Error("Erro ao criar registro");
    }
  }
}

export default new UserController();
