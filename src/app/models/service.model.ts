import { Company } from './company.model';
import { DataType, ForeignKey } from "sequelize-typescript";
import { Column } from "sequelize-typescript";
import { BaseModel } from "./Base.model";
import { Table } from "sequelize-typescript";

export interface IService {
  id: number;
  descricao: string;
  empresaId: number;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "services",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class Service extends BaseModel<Service> implements IService {
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
    allowNull: true,
    field: "empresa_id",
  })
  @ForeignKey(() => Company)
  empresaId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "descricao",
    comment: "CPF ou CNPJ da empresa",
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
