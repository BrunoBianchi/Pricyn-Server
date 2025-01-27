"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const authorization_middleware_1 = require("../../../middlewares/authorization-middleware");
const stripe_module_1 = __importDefault(require("../../../services/stripe-module"));
const stripe_middleware_1 = require("../../../middlewares/stripe-middleware");
const zod_1 = require("zod");
const products_module_1 = __importDefault(require("../../../services/products-module"));
exports.route.use((0, cors_1.default)({
    origin: ['https://dash.pricyn.com', 'https://www.pricyn.com', 'https://pricyn.com', 'http://localhost:5000', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}));
exports.route.use(authorization_middleware_1.authorizationMiddleware);
exports.route.use(stripe_middleware_1.stripeMiddleware);
exports.route.get('/:provider/list', async (req, res) => {
    switch (req.params.provider) {
        case 'stripe':
            const products = await products_module_1.default.mergeProducts(await products_module_1.default.getProductByOwnerAndProvider(req.user.uid, req.params.provider), await stripe_module_1.default.getProducts(req.user.stripe));
            res.json({ products: products });
            break;
        default:
            res.status(404).json({ message: 'Provider not found' });
    }
});
exports.route.post('/:provider/', async (req, res) => {
    try {
        const product = zod_1.z.object({
            name: zod_1.z.string(),
            comments: zod_1.z.string().optional().or(zod_1.z.null()),
            provider: zod_1.z.string(),
            prices: zod_1.z.array(zod_1.z.object({
                country: zod_1.z.string(),
                currency: zod_1.z.string(),
                default: zod_1.z.boolean().or(zod_1.z.null()),
                recurring: zod_1.z.object({
                    interval: zod_1.z.string(),
                }).optional().or(zod_1.z.null()),
                unit_amount: zod_1.z.number(),
            })),
            uid: zod_1.z.string().optional().or(zod_1.z.null()),
        }).parse(req.body);
        const productSaved = await products_module_1.default.createProduct(product, req.user.uid, req.headers.stripeauthorization);
        res.json(productSaved);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});
//# sourceMappingURL=products-module.js.map