import { Company } from "./company.model";
import { HttpException } from "../shared/exceptions";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import {
  Table,
  Column,
  DataType,
  BeforeCreate,
  BeforeSave,
  ForeignKey,
} from "sequelize-typescript";
import { BaseModel } from "./Base.model";

export interface IUser {
  id: number;
  empresaId: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  senha: string;
  dataNascimento: string;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "users",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class User extends BaseModel<User> implements IUser {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    comment: "Identificador único da tabela",
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "empresa_id",
  })
  @ForeignKey(() => Company)
  empresaId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cpf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  celular: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dataNascimento: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "data_inclusao",
    defaultValue: DataType.NOW,
  })
  dataInclusao?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "data_alteracao",
    defaultValue: DataType.NOW,
  })
  dataAlteracao?: Date;

  @BeforeCreate
  public static async hashPassword(user: User, options: any) {
    user.setSenha(user.senha);
  }

  @BeforeSave
  public static async verificaEmailCadastrado(user: User, options: any) {
    var where: any = {
      email: user.email,
    };
    if (user.id) {
      where.id = { $ne: user.id };
    }
    let c = await User.count({ where });
    if (c > 0)
      throw new HttpException(
        "Já existe um usuário utilizando o email informado!"
      );
    return;
  }

  json() {
    let user: IUser | any = this.toJSON();
    delete user.senha;
    delete user.id;
    return user;
  }

  public setSenha(senhaNova: string) {
    if (senhaNova.length < 8)
      throw new HttpException("A senha deve possuir no minimo de 8 caracteres");
    this.senha = crypto.createHmac("sha256", senhaNova).digest("hex");
  }

  public compareSenha(senha: string) {
    return this.senha === crypto.createHmac("sha256", senha).digest("hex");
  }

  public generateToken(isApi: boolean = false) {
    let token = jwt.sign({ sub: this.id }, process.env.JWT_SECRET + "", {
      expiresIn: process.env.JWT_EXP_TIME,
    });
    const decoded = jwt.decode(token, { complete: true });
    // const expiresIn = String(moment.unix(decoded.payload.exp).toDate().getSeconds());

    return {
      token,
      // expiresIn
    };
  }

  public generateTokenResetSenha() {
    return jwt.sign({ usr: this.id, res: true }, process.env.JWT_SECRET + "", {
      expiresIn: "1h",
    });
  }

  public validateToken(token: string, isApi: boolean = false): boolean {
    return !!jwt.verify(token, process.env.JWT_SECRET + "");
  }

  public validateTokenResetSenha(token: string): boolean {
    return !!jwt.verify(token, process.env.JWT_SECRET + "");
  }
}
