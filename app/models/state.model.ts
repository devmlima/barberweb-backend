import { Table, Column, DataType } from "sequelize-typescript";
import { BaseModel } from "./Base.model";

export interface IState {
  sigla: string;
  descricao: string;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "state",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class State extends BaseModel<State> implements IState {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    comment: "Sigla do estado e identificador único da tabela",
  })
  sigla: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: "Nome completo do estado",
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
