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
const notifications_module_1 = __importDefault(require("../../../services/notifications-module"));
exports.route.use((0, cors_1.default)({
    origin: ['https://dash.pricyn.com', 'http://localhost:3000', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}));
exports.route.use(authorization_middleware_1.authorizationMiddleware);
exports.route.get('/list', async (req, res) => {
    try {
        const data = await notifications_module_1.default.getUserNotifications(req.user.uid);
        res.status(200).json({ message: 'Notifications fetched', data });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//# sourceMappingURL=notifications-routing.module.js.map