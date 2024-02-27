"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @packages
var express_1 = __importDefault(require("express"));
// @scripts
var clients_routes_1 = __importDefault(require("./clients.routes"));
var router = express_1.default.Router();
var routerApi = function (app) {
    app.use('/api', router);
    router.use('/clients', clients_routes_1.default);
};
exports.default = routerApi;
//# sourceMappingURL=index.js.map