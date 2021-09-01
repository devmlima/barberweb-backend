import { User } from './app/api/models/user.model';
import { Sequelize } from "sequelize-typescript";
import { Op as OpSequelize } from "sequelize";

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
  host: 'barberiaweb.cvjbmiv4gauk.us-east-1.rds.amazonaws.com',
  database: 'db_barbearia',
  dialect: "postgres",
  username: 'devmlima',
  password: 'm.30861383',
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
])

export const sequelizeAuthenticate = async () => {
  return await sequelize.authenticate();
};
