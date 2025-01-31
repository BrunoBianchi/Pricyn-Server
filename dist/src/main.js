"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_routing_module_1 = __importDefault(require("./controller/routes/routes-routing-module"));
const data_source_1 = require("./database/data-source");
const app = (0, express_1.default)();
// CORS Configuration
const corsOptions = {
    origin: [
        'https://www.pricyn.com',
        'https://pricyn.com',
        'https://dash.pricyn.com',
        'http://localhost:4200',
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'stripeAuthorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.disable('x-powered-by');
// Apply CORS before other middleware
app.use((0, cors_1.default)(corsOptions));
// Handle preflight requests
app.options('*', (0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: false
}));
app.use(express_1.default.json());
app.use(routes_routing_module_1.default);
app.use(express_1.default.static(__dirname + '/assets/'));
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
})
    .catch(error => console.log("Data Source initialization error:", error));
//# sourceMappingURL=main.js.map