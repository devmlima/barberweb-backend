import { Schedule } from './schedule.model';
import { Service } from './service.model';
import { User } from './user.model';
import { Client } from './client.model';
import { Company } from './company.model';
import { DataType, ForeignKey } from "sequelize-typescript";
import { Column } from "sequelize-typescript";
import { BaseModel } from "./Base.model";
import { Table, BelongsTo } from "sequelize-typescript";

export interface ICutsMade {
  id?: number;
  descricao: string;
  empresaId: number;
  usuarioId: number;
  clienteId: number;
  servicoId: number;
  valor: number;
  formaPagamentoId: number;
  cancelado: boolean;
  hora: string;
  data: string;
  dataInclusao?: Date;
  dataAlteracao?: Date;
}

@Table({
  tableName: "cortes_realizados",
  timestamps: false,
  schema: "public",
  createdAt: "dataInclusao",
  updatedAt: "dataAlteracao",
})
export class CutsMade extends BaseModel<CutsMade> implements ICutsMade {
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
    type: DataType.INTEGER,
    allowNull: true,
    field: "usuario_id",
  })
  @ForeignKey(() => User)
  usuarioId: number;


  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "cliente_id",
  })
  @ForeignKey(() => Client)
  clienteId: number;

  @BelongsTo(() => Client)
  client: Client;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "servico_id",
  })
  @ForeignKey(() => Service)
  servicoId: number;

  @BelongsTo(() => Service)
  service: Service;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "agendamento_id",
  })
  @ForeignKey(() => Schedule)
  agendamentoId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "descricao",
    comment: "Descrição do serviço",
  })
  descricao: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    field: "valor",
    comment: "Valor do serviço",
  })
  valor: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
    field: "forma_pagamento_id",
    comment: "Id do pagamento",
  })
  formaPagamentoId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "cancelado",
    defaultValue: false,
    comment: "Verifica se o serviço realizado está cancelado",
  })
  cancelado: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "data",
    comment: "Data do serviço",
  })
  data: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "hora",
    defaultValue: false,
    comment: "Hora do agendamento",
  })
  hora: string;

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
