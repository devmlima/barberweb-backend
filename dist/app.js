"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _database2 = require("./database");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./app/routes/user.route"));

var _company = _interopRequireDefault(require("./app/routes/company.route"));

var _address = _interopRequireDefault(require("./app/routes/address.route"));

var _city = _interopRequireDefault(require("./app/routes/city.route"));

var _client = _interopRequireDefault(require("./app/routes/client.route"));

var _profile = _interopRequireDefault(require("./app/routes/profile.route"));

var _state = _interopRequireDefault(require("./app/routes/state.route"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

var _service = _interopRequireDefault(require("./app/routes/service.route"));

var _schedule = _interopRequireDefault(require("./app/routes/schedule.route"));

var App = /*#__PURE__*/function () {
  function App() {
    (0, _classCallCheck2.default)(this, App);
    (0, _defineProperty2.default)(this, "port", process.env.PORT || 3000);
    this.express = (0, _express.default)();
    this.middlewares();
    this.database();
    this.routes();
    this.listen();
  }

  (0, _createClass2.default)(App, [{
    key: "getApp",
    value: function getApp() {
      return this.express;
    }
  }, {
    key: "listen",
    value: function listen() {
      this.express.listen(this.port, function () {
        console.log("Aplicação iniciada na porta 3000!");
      });
    }
  }, {
    key: "middlewares",
    value: function middlewares() {
      this.express.use(_express.default.json());
      this.express.use((0, _cors.default)());
    }
  }, {
    key: "database",
    value: function () {
      var _database = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _database2.sequelizeAuthenticate)();

              case 2:
                console.log("Banco conectado com sucesso!");

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function database() {
        return _database.apply(this, arguments);
      }

      return database;
    }()
  }, {
    key: "routes",
    value: function routes() {
      this.express.use("/api", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
      this.express.use("/users", _user.default);
      this.express.use("/company", _company.default);
      this.express.use("/address", _address.default);
      this.express.use("/city", _city.default);
      this.express.use("/client", _client.default);
      this.express.use("/profile", _profile.default);
      this.express.use("/state", _state.default);
      this.express.use("/service", _service.default);
      this.express.use("/schedule", _schedule.default);
    }
  }]);
  return App;
}();

exports.App = App;