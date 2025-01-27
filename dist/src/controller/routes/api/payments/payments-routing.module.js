"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const products_module_1 = __importDefault(require("../../../services/products-module"));
const cors_1 = __importDefault(require("cors"));
const authorization_middleware_1 = require("../../../../controller/middlewares/authorization-middleware");
const zod_1 = __importDefault(require("zod"));
exports.route = express_1.default.Router();
exports.route.post('/recieve', (0, cors_1.default)({
    origin: ['http://localhost:4200', 'http://localhost:3000', 'https://dash.pricyn.com'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}), async (req, res) => {
    await products_module_1.default.incrementProductInformation(req.body.productId, req.body.amount);
    res.status(200).json('Payment received');
});
exports.route.get('/total-amount', authorization_middleware_1.authorizationMiddleware, async (req, res) => {
    try {
        const products = await products_module_1.default.getProductByOwner(req.user.uid);
        const total = products.reduce((acc, product) => {
            acc += Number(product.sales || 0);
            return acc;
        }, 0);
        res.json({ total });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch total amount' });
    }
});
exports.route.get('/getProductInfo', (0, cors_1.default)({
    origin: ['http://localhost:4200', 'http://localhost:3000', 'https://payments.pricyn.com', 'http://localhost:59786'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}), async (req, res) => {
    try {
        const params = zod_1.default.object({
            id: zod_1.default.string()
        }).parse(req.query);
        const product = await products_module_1.default.findProdutBySearchId(params.id);
        res.json({ product });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get product' });
    }
});
//# sourceMappingURL=payments-routing.module.js.map