import { State } from "./state.model";
import { Company } from "./company.model";
import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { BaseModel } from "./Base.model";

export interface IAddress {
  id: number;
  empresaId: number;
  rua: string;
  numero: number;
  cep: string;
  estadoId: number;
  cidadeId: number;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "address",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class Address extends BaseModel<Address> implements IAddress {
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
    type: DataType.STRING,
    allowNull: false,
    field: "rua",
    comment: "Nome da Rua",
  })
  rua: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    field: "numero",
    comment: "Número do estabelecimento",
  })
  numero: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: "CEP da empresa",
  })
  cep: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "estado_id",
    comment: "Identificador do estado",
  })
  @ForeignKey(() => State)
  estadoId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "cidade_id",
    comment: "Identificador da cidade",
  })
  // @ForeignKey(() => City)
  cidadeId: number;

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
