import { Table, Column, DataType } from "sequelize-typescript";
import { BaseModel } from "./Base.model";

export interface ICity {
  id: number;
  descricao: string;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "city",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class City extends BaseModel<City> implements ICity {
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
    comment: "Nome completo da cidade",
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
