import { Address } from "./address.model";
import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { BaseModel } from "./Base.model";

export interface ICompany {
  id: number;
  cpfCnpj: string;
  enderecoId: number;
  razaoSocial: string;
  nomeFantasia: string;
  telefone: string;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "company",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class Company extends BaseModel<Company> implements ICompany {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    comment: "Identificador único da tabela",
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "cpf_cnpj",
    comment: "CPF ou CNPJ da empresa",
  })
  cpfCnpj: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "endereco_id",
    comment: "Identificador do endereço da empresa",
  })
  @ForeignKey(() => Address)
  enderecoId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "razao_social",
    comment: "Razão social da empresa",
  })
  razaoSocial: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "nome_fantasia",
    comment: "Nome fantasia da empresa",
  })
  nomeFantasia: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: "Telefone da empresa",
  })
  telefone: string;

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
