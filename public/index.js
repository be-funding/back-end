"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @packages
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// @scripts
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var port = 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, routes_1.default)(app);
app.get('/', function (_, res) {
    res.status(200).send('Hello from Express');
});
app.listen(port, function () { return console.log("Server is listening on port ".concat(port, "!")); });
//# sourceMappingURL=index.js.map