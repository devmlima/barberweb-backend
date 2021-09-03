import { User } from './../models/user.model';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { get } from "lodash";
import { UnauthorizedException } from "./exceptions";

export const authMiddleware = async (req: any, res: Response) => {
  const token = get(req, "headers.authorization", "")
    .replace("Bearer", "")
    .trim();
  const decoded = jwt.decode(token, { complete: true });
  const user = new User();

  let usuario = null;
  if (decoded) {
    usuario = User.findOne({ where: { id: decoded.payload.sub } });
  }

  if (!usuario) return res.status(401).send("Usuário não encontrado!");

  try {
    if (decoded) user.validateToken(token);
  } catch (e: any) {
    switch (e.name) {
      case "TokenExpiredError":
        throw new UnauthorizedException("Token expirado!");
      case "JsonWebTokenError":
        throw new UnauthorizedException("Token mal formado!");
      case "NotBeforeError":
        throw new UnauthorizedException("Token ainda não pode ser utilizado!");
      default:
        throw new UnauthorizedException("Token inválido!");
    }
  }

  req.usuarioLogado = usuario;

  // PASSAR FUNÇÃO DE VERIFICAÇÃO DE PERMISSÕES DE ACESSO AQUI
};
