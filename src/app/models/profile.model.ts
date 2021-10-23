import { Company } from "./company.model";
import { User } from "./user.model";
import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { BaseModel } from "./Base.model";

export interface IProfile {
  id: number;
  permissoes: string;
  empresaId: number;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "profile",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class Profile extends BaseModel<Profile> implements IProfile {
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
    comment: "Identificador da empresa",
  })
  @ForeignKey(() => Company)
  empresaId: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    comment: "Permissões do usuário",
  })
  permissoes: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descricao: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "data_inclusao",
    defaultValue: DataType.NOW,
    comment: "Data de inclusão do registro",
  })
  dataInclusao?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "data_alteracao",
    defaultValue: DataType.NOW,
    comment: "Data de alteração do registro",
  })
  dataAlteracao?: Date;
}
