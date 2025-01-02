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
exports.route.use((0, cors_1.default)({
    origin: ['https://dash.pricyn.com', 'https://www.pricyn.com', 'https://pricyn.com', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}));
exports.route.use(authorization_middleware_1.authorizationMiddleware);
exports.route.get('/@me', (req, res) => {
    res.json({ data: {
            name: req.user.name,
            email: req.user.email,
            createdAt: req.user.createdAt,
            isActive: req.user.isActive
        } });
});
//# sourceMappingURL=user-module.js.map