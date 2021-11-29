import { Client } from './client.model';
import { Company } from "./company.model";
import { User } from "./user.model";
import { Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { BaseModel } from "./Base.model";
import { Service } from "./service.model";

export interface ISchedule {
  id: number;
  servicoId: number;
  empresaId: number;
  hora: string;
  clienteId: number;
  usuarioId: number;
  cancelado: boolean;
  confirmado: boolean;
  dataOperacao: string;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "schedule",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class Schedule extends BaseModel<Schedule> implements ISchedule {
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
    allowNull: false,
    field: "usuario_id",
    comment: "Identificador do usuário",
  })
  @ForeignKey(() => User)
  usuarioId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "servico_id",
    comment: "Identificador do serviço",
  })
  @ForeignKey(() => Service)
  servicoId: number;

  @BelongsTo(() => Service)
  service: Service;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "cliente_id",
    comment: "Identificador do cliente",
  })
  @ForeignKey(() => Client)
  clienteId: number;

  @BelongsTo(() => Client)
  client: Client;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "cancelado",
    defaultValue: false,
    comment: "Verifica se o agendamento está cancelado",
  })
  cancelado: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "confirmado",
    defaultValue: true,
    comment: "Verifica se o agendamento está confirmado, ou seja, foi realizado",
  })
  confirmado: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "hora",
    defaultValue: false,
    comment: "Hora do agendamento",
  })
  hora: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "data_operacao",
    comment: "Data de Operação do registro",
  })
  dataOperacao: string;

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
