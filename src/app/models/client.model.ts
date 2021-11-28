import { Address } from "./address.model";
import { Company } from "./company.model";
import { Table, Column, DataType, ForeignKey, BeforeCreate } from "sequelize-typescript";
import { BaseModel } from "./Base.model";

export interface IClient {
  id: number;
  empresaId: number;
  enderecoId: number;
  nome: string;
  cpfCnpj: string;
  celular: string;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "client",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class Client extends BaseModel<Client> implements IClient {
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
    type: DataType.INTEGER,
    allowNull: true,
    field: "endereco_id",
    comment: "Identificador do endereço da empresa",
  })
  @ForeignKey(() => Address)
  enderecoId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: "Nome do cliente",
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "cpf_cnpj",
    comment: "Cpf ou Cnpj do cliente",
  })
  cpfCnpj: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: "Telefone celular do cliente",
  })
  celular: string;

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
