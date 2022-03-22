import { CutsMade } from './app/models/cutsMade.model';
import { Schedule } from './app/models/schedule.model';
import { State } from './app/models/state.model';
import { Profile } from './app/models/profile.model';
import { Client } from './app/models/client.model';
import { City } from './app/models/city.model';
import { Address } from './app/models/address.model';
import { Company } from './app/models/company.model';
import { User } from './app/models/user.model';
import { Sequelize } from "sequelize-typescript";
import { Op as OpSequelize } from "sequelize";
import * as dotenv from "dotenv";
import { Service } from './app/models/service.model';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const operatorsAliases = {
  $eq: OpSequelize.eq,
  $ne: OpSequelize.ne,
  $gte: OpSequelize.gte,
  $gt: OpSequelize.gt,
  $lte: OpSequelize.lte,
  $lt: OpSequelize.lt,
  $not: OpSequelize.not,
  $in: OpSequelize.in,
  $notIn: OpSequelize.notIn,
  $is: OpSequelize.is,
  $like: OpSequelize.like,
  $notLike: OpSequelize.notLike,
  $iLike: OpSequelize.iLike,
  $notILike: OpSequelize.notILike,
  $regexp: OpSequelize.regexp,
  $notRegexp: OpSequelize.notRegexp,
  $iRegexp: OpSequelize.iRegexp,
  $notIRegexp: OpSequelize.notIRegexp,
  $between: OpSequelize.between,
  $notBetween: OpSequelize.notBetween,
  $overlap: OpSequelize.overlap,
  $contains: OpSequelize.contains,
  $contained: OpSequelize.contained,
  $adjacent: OpSequelize.adjacent,
  $strictLeft: OpSequelize.strictLeft,
  $strictRight: OpSequelize.strictRight,
  $noExtendRight: OpSequelize.noExtendRight,
  $noExtendLeft: OpSequelize.noExtendLeft,
  $and: OpSequelize.and,
  $or: OpSequelize.or,
  $any: OpSequelize.any,
  $all: OpSequelize.all,
  $values: OpSequelize.values,
  $col: OpSequelize.col,
};

export const sequelize = new Sequelize({
  host: process.env.HOST,
  database: process.env.DATABASE,
  dialect: "postgres",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  operatorsAliases,
  pool: {
    max: 1,
    min: 0,
    idle: 10000,
    acquire: 10000,
  },
  define: {
    timestamps: false, // true by default
  },
  logQueryParameters: true,
});

sequelize.addModels([
  User,
  Company,
  Address,
  City,
  Client,
  Profile,
  State,
  Service,
  Schedule,
  CutsMade
])

export const sequelizeAuthenticate = async () => {
  return await sequelize.authenticate();
};

export const Op = OpSequelize;