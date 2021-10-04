import { setUserLogged } from "./tenant";
import { User } from "../models/user.model";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { get } from "lodash";
import { UnauthorizedException } from "./exceptions";

export const authMiddleware = async (req: any, res: Response, next: any) => {
  const token = get(req, "headers.authorization", "")
    .replace("Bearer", "")
    .trim();
  const decoded = jwt.decode(token, { complete: true });
  const user = new User();

  if (!token) return res.status(401).send("Usuário não autenticado!");
  let userModel: User = null;
  if (decoded) {
    userModel = await User.findOne({ where: { id: decoded.payload.sub } });
  }

  if (!userModel) return res.status(401).send("Usuário não encontrado!");

  try {
    if (decoded) user.validateToken(token, userModel.secret);
  } catch (e: any) {
    switch (e.name) {
      case "TokenExpiredError":
        return res.status(401).send("Token expirado!");
      case "JsonWebTokenError":
        return res.status(401).send("Token mal formado!");
      case "NotBeforeError":
        return res.status(401).send("Token ainda não pode ser utilizado!");
      default:
        return res.status(401).send("Token inválido!");
    }
  }

  req.headers.userLogged = userModel;
  setUserLogged(userModel);
  next();
  // PASSAR FUNÇÃO DE VERIFICAÇÃO DE PERMISSÕES DE ACESSO AQUI
};
