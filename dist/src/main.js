"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_routing_module_1 = __importDefault(require("./controller/routes/routes-routing-module"));
const data_source_1 = require("./database/data-source");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello World z1');
});
// Initialize database first
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.use(express_1.default.json());
    app.use(routes_routing_module_1.default);
    app.listen(3000, () => console.log('Server running on port 3000'));
})
    .catch(error => console.log("Data Source initialization error:", error));
//# sourceMappingURL=main.js.map