"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_routing_module_1 = __importDefault(require("./controller/routes/routes-routing-module"));
const data_source_1 = require("./database/data-source");
const app = (0, express_1.default)();
// Initialize database first
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.use(express_1.default.json());
    app.use(routes_routing_module_1.default);
    app.use(express_1.default.static(__dirname + '/assets/'));
    app.use('*', (req, res) => {
        res.json("404 - Page not found! ");
    });
    app.listen(5000, () => console.log('Server running on port 5000'));
})
    .catch(error => console.log("Data Source initialization error:", error));
//# sourceMappingURL=main.js.map