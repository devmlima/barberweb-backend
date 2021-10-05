"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Op = exports.sequelizeAuthenticate = exports.sequelize = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _schedule = require("./app/models/schedule.model");

var _state = require("./app/models/state.model");

var _profile = require("./app/models/profile.model");

var _client = require("./app/models/client.model");

var _city = require("./app/models/city.model");

var _address = require("./app/models/address.model");

var _company = require("./app/models/company.model");

var _user = require("./app/models/user.model");

var _sequelizeTypescript = require("sequelize-typescript");

var _sequelize = require("sequelize");

var dotenv = _interopRequireWildcard(require("dotenv"));

var _service = require("./app/models/service.model");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

var operatorsAliases = {
  $eq: _sequelize.Op.eq,
  $ne: _sequelize.Op.ne,
  $gte: _sequelize.Op.gte,
  $gt: _sequelize.Op.gt,
  $lte: _sequelize.Op.lte,
  $lt: _sequelize.Op.lt,
  $not: _sequelize.Op.not,
  $in: _sequelize.Op.in,
  $notIn: _sequelize.Op.notIn,
  $is: _sequelize.Op.is,
  $like: _sequelize.Op.like,
  $notLike: _sequelize.Op.notLike,
  $iLike: _sequelize.Op.iLike,
  $notILike: _sequelize.Op.notILike,
  $regexp: _sequelize.Op.regexp,
  $notRegexp: _sequelize.Op.notRegexp,
  $iRegexp: _sequelize.Op.iRegexp,
  $notIRegexp: _sequelize.Op.notIRegexp,
  $between: _sequelize.Op.between,
  $notBetween: _sequelize.Op.notBetween,
  $overlap: _sequelize.Op.overlap,
  $contains: _sequelize.Op.contains,
  $contained: _sequelize.Op.contained,
  $adjacent: _sequelize.Op.adjacent,
  $strictLeft: _sequelize.Op.strictLeft,
  $strictRight: _sequelize.Op.strictRight,
  $noExtendRight: _sequelize.Op.noExtendRight,
  $noExtendLeft: _sequelize.Op.noExtendLeft,
  $and: _sequelize.Op.and,
  $or: _sequelize.Op.or,
  $any: _sequelize.Op.any,
  $all: _sequelize.Op.all,
  $values: _sequelize.Op.values,
  $col: _sequelize.Op.col
};
var sequelize = new _sequelizeTypescript.Sequelize({
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
    acquire: 10000
  },
  define: {
    timestamps: false // true by default

  },
  logQueryParameters: true
});
exports.sequelize = sequelize;
sequelize.addModels([_user.User, _company.Company, _address.Address, _city.City, _client.Client, _profile.Profile, _state.State, _service.Service, _schedule.Schedule]);

var sequelizeAuthenticate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sequelize.authenticate();

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sequelizeAuthenticate() {
    return _ref.apply(this, arguments);
  };
}();

exports.sequelizeAuthenticate = sequelizeAuthenticate;
var Op = _sequelize.Op;
exports.Op = Op;