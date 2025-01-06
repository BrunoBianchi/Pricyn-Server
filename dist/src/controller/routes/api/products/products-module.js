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
exports.route.use((0, cors_1.default)({
    origin: ['https://dash.pricyn.com', 'https://www.pricyn.com', 'https://pricyn.com', 'http://localhost:3000', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}));
exports.route.use(authorization_middleware_1.authorizationMiddleware);
exports.route.use(stripe_middleware_1.stripeMiddleware);
exports.route.get('/:provider/list', async (req, res) => {
    switch (req.params.provider) {
        case 'stripe':
            res.json({ products: await stripe_module_1.default.getProducts(req.user.stripe) });
            break;
        default:
            res.status(404).json({ message: 'Provider not found' });
    }
});
//# sourceMappingURL=products-module.js.map