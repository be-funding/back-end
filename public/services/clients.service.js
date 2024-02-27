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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProductsService = /** @class */ (function () {
    function ProductsService() {
        this.clients = [];
    }
    ;
    ProductsService.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clients;
            return __generator(this, function (_a) {
                try {
                    clients = [
                        {
                            date: '2023-07-20',
                            email: 'lelo69@yopmail.com',
                            name: 'lelo',
                            last_name: 'prueba',
                            currency: 1,
                            clients: 1
                        },
                        {
                            date: '2023-10-24',
                            email: 'kevinescobarshar@gmail.com',
                            name: 'Kevin',
                            last_name: 'Escobar',
                            currency: 1,
                            clients: 1
                        },
                        {
                            date: '2023-10-31',
                            email: 'kevinescobartibui@gmail.com',
                            name: 'Test',
                            last_name: 'Be Funding',
                            currency: 1,
                            clients: 1
                        },
                        {
                            date: '2023-11-03',
                            email: 'ibuser@yopmail.com',
                            name: 'cliente',
                            last_name: 'master',
                            currency: 1,
                            clients: 1
                        },
                        {
                            date: '2023-11-03',
                            email: 'clientib@yopmail.com',
                            name: 'client',
                            last_name: 'user',
                            currency: 1,
                            clients: 1
                        },
                        {
                            date: '2023-11-07',
                            email: 'info@kevinshark.com',
                            name: 'Kevin',
                            last_name: 'Shark',
                            currency: 1,
                            clients: 1
                        },
                        {
                            date: '2023-11-07',
                            email: 'silvana.ffa16a@gmail.com',
                            name: 'Sebastián',
                            last_name: 'Rivera',
                            currency: 1,
                            clients: 1
                        }
                    ];
                    return [2 /*return*/, clients];
                }
                catch (error) {
                    return [2 /*return*/, error.status];
                }
                return [2 /*return*/];
            });
        });
    };
    return ProductsService;
}());
exports.default = ProductsService;
//# sourceMappingURL=clients.service.js.map