import * as jwt from "jsonwebtoken";

class UserProvider  {
  static generateTokenResetSenha = (id: number): string => {
    return jwt.sign({ usr: id, res: true }, process.env.JWT_SECRET + "", {
      expiresIn: "1h",
    });
  };

  static validateToken = (token: string): boolean => {
    return !!jwt.verify(token, process.env.JWT_SECRET + "");
  };

  static validateTokenResetSenha = (token: string): boolean => {
    return !!jwt.verify(token, process.env.JWT_SECRET + "");
  };
};

export default UserProvider;
