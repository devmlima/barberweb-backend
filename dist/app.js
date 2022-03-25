"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./app/routes/user.route"));
const company_route_1 = __importDefault(require("./app/routes/company.route"));
const address_route_1 = __importDefault(require("./app/routes/address.route"));
const city_route_1 = __importDefault(require("./app/routes/city.route"));
const client_route_1 = __importDefault(require("./app/routes/client.route"));
const profile_route_1 = __importDefault(require("./app/routes/profile.route"));
const state_route_1 = __importDefault(require("./app/routes/state.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const service_route_1 = __importDefault(require("./app/routes/service.route"));
const schedule_route_1 = __importDefault(require("./app/routes/schedule.route"));
const cutsMade_route_1 = __importDefault(require("./app/routes/cutsMade.route"));
const dash_route_1 = __importDefault(require("./app/routes/dash.route"));
class App {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.express = (0, express_1.default)();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }
    getApp() {
        return this.express;
    }
    listen() {
        this.express.listen(this.port, () => {
            console.info("Aplicação iniciada na porta", this.port);
        });
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use((0, cors_1.default)());
    }
    database() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.sequelizeAuthenticate)();
            if (process.env.NODE_ENV === "dev") {
                console.info("Banco local conectado com sucesso!");
            }
            else {
                console.info("Banco de produção conectado com sucesso!");
            }
        });
    }
    routes() {
        this.express.use("/api", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        this.express.use("/users", user_route_1.default);
        this.express.use("/company", company_route_1.default);
        this.express.use("/address", address_route_1.default);
        this.express.use("/city", city_route_1.default);
        this.express.use("/client", client_route_1.default);
        this.express.use("/profile", profile_route_1.default);
        this.express.use("/state", state_route_1.default);
        this.express.use("/service", service_route_1.default);
        this.express.use("/schedule", schedule_route_1.default);
        this.express.use("/cutsMade", cutsMade_route_1.default);
        this.express.use("/dashboard", dash_route_1.default);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map