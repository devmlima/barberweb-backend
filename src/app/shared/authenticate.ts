import { Profile } from './../models/profile.model';
import { setUserLogged } from "./tenant";
import { User } from "../models/user.model";
import { Response } from "express";
import * as jwt from "jsonwebtoken";
import { get } from "lodash";

export const authMiddleware = async (req: any, res: Response, next: any) => {
  const token = get(req, "headers.authorization", "")
    .replace("Bearer", "")
    .trim();
  const decoded = jwt.decode(token, { complete: true });
  const user = new User();

  if (!token) return res.status(401).send("Usuário não autenticado!");
  let userModel: User = null;
  if (decoded) {
    userModel = await User.findOne({ where: { id: decoded.payload.sub }, include: [Profile] });
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
  req.headers.companyId = userModel.empresaId;
  req.headers.permitions = JSON.parse(userModel.profile.permissoes);

  setUserLogged(userModel);
  next();
};

export const authPermitions = async (req: any, res: Response, next: any) => {
  const permitions = req.headers.permitions;
  const route = req.baseUrl.substring(1);
  const permitionsRoute = permitions[route];
  const method = req.method;

  if (method.toLowerCase() !== 'get' && permitionsRoute && !permitionsRoute.writing) {
    return res.send("Você não tem permissão para efetuar alterações!");
  }

  if (method.toLowerCase() === 'get' && permitionsRoute && !permitionsRoute.reading) {
    return res.status(401).send("Você não tem permissão para visualizar esta rotina!");
  }

  if (permitions.client.all && permitions.profile.all && permitions.schedule.all &&
    permitions.service.all && permitions.user.all) {
      req.headers.admin = true;
  } else {
    req.headers.admin = false;
  }

  next();
}
