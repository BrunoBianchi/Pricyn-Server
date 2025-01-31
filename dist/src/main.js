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
app.disable('x-powered-by');
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'", 'localhost:4200'],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'localhost:4200'],
            styleSrc: ["'self'", "'unsafe-inline'", 'localhost:4200'],
            imgSrc: ["'self'", 'data:', 'localhost:4200', 'cdn.pricyn.com'],
            connectSrc: ["'self'", 'localhost:4200', 'localhost:5000', 'dash.pricyn.com', 'api.pricyn.com'],
            fontSrc: ["'self'", 'data:', 'localhost:4200'],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'", 'localhost:4200']
        }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: false
}));
app.use((0, cors_1.default)({
    origin: ['http://localhost:4200', 'https://dash.pricyn.com', 'https://www.pricyn.com'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'stripeAuthorization'],
    credentials: true
}));
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