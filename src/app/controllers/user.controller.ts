import { Company } from "../models/company.model";
import { IUser, User } from "../models/user.model";
import { Request, Response } from "express";
import { Op } from "../../database";
import { get } from "lodash";
import { v4 as uuidv4 } from "uuid";

class UserController {
  async find(request: Request, response: Response): Promise<Response> {
    const query: any = request.query;
    const userLogged: any = request.headers.userLogged;

    try {
      const user = await User.findAll({
        where: { empresaId: userLogged.empresaId },
      } as any);
      return response.status(200).json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const user = await User.findOne({ where: { id: id } as any });
      delete user.senha;
      delete user.secret;
      
      return response.json(user);
    } catch (e) {
      return response.status(500).send("Erro ao pesquisar registro");
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const body: IUser = request.body;

    try {
      await User.update(body, { where: { id: body.id } as any });
      return response.json(true);
    } catch (e) {
      return response.status(500).send("Erro ao atualizar registro");
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = get(request, "params.id", null);

    try {
      const user = await User.findOne({ where: { id: id } });
      user.destroy();
      return response.status(200).json(true);
    } catch (e) {
      return response.status(500).json("Erro ao excluir registro");
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    const companyId: any = request.headers.companyId;

    try {
      const params: any = {
        nome: body.nome,
        cpf: body.cpf,
        email: body.email,
        celular: body.celular,
        senha: body.senha,
        dataNascimento: body.dataNascimento,
        empresaId: companyId,
      };

      let instance = await User.findOne({
        where: { email: { [Op.iLike]: body.email } } as any,
      });

      if (instance) {
        response
          .status(401)
          .json("Já existe um usuário cadastrado com o email informado!");
        return;
      }

      instance = await User.create(params as any);
      const { token, expiresIn } = instance.generateToken();

      return response
        .status(200)
        .json({ ...instance.json(), token, expiresIn });
    } catch (e) {
      throw new Error("Erro ao criar registro");
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const body: IUser = request.body;

    if (!body)
      return response.status(400).json("Dados de usuário não informado!");
    if (!body.email) return response.status(400).json("Email não informado!");
    if (!body.senha && !body.provider)
      response.status(400).json("Senha não informada!");

    const user = await User.findOne({ where: { email: body.email } as any });
    if (!user) response.status(400).json("Usuário não encontrado!");

    if (!body.provider && !user.compareSenha(body.senha)) {
      response.status(400).json("Senha inválida");
    }

    const instance = user.json();
    const { token } = user.generateToken();

    const result = { ...instance, token };
    return response.json(result);
  }

  async signUp(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    const company = body.empresa;

    try {
      let instanceCompany = await Company.findOne({
        where: { cpfCnpj: { [Op.iLike]: company.cpfCnpj } } as any,
      });

      if (instanceCompany) {
        response
          .status(401)
          .json("Já existe uma empresa cadastrada com o documento informado!");
        return;
      }

      instanceCompany = await Company.create(company as any);

      const params: any = {
        nome: body.nome,
        cpf: body.cpf,
        email: body.email,
        celular: body.celular,
        senha: body.senha,
        dataNascimento: body.dataNascimento,
        empresaId: instanceCompany.id,
        image: body.image,
        provider: body.provider,
      };

      if (params.provider) {
        params.senha = uuidv4();
      }

      let instance = await User.findOne({
        where: { email: { [Op.iLike]: body.email } } as any,
      });

      if (instance) {
        response
          .status(401)
          .json("Já existe um usuário cadastrado com o documento informado!");
        return;
      }

      instance = await User.create(params as any);
      const { token, expiresIn } = instance.generateToken();

      return response
        .status(200)
        .json({ ...instance.json(), token, expiresIn });
    } catch (e) {
      response.status(400).json("Erro ao criar registro");
    }
  }

  async dataUser(request: Request, response: Response): Promise<Response> {
    console.log("Implementar...");

    return response.status(500).json("Rota não implementada");
  }

  async verifyToken(request: Request, response: Response): Promise<Response> {
    try {
      const user: any = request.headers.userLogged;
      const token = get(request, "headers.authorization", "")
        .replace("Bearer", "")
        .trim();

      const userModel = await User.findOne({ where: { id: user.id } });
      const valid = userModel.validateToken(token, userModel.secret);

      if (valid) return response.status(200).json(valid);
      else
        return response
          .status(401)
          .json("Sessão expirada, faça login novamente!");
    } catch (e) {
      return response
        .status(501)
        .json(
          "Erro ao validar token, entre em contato com o administrador do sistema"
        );
    }
  }
}

export default new UserController();
