"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authorization_middleware_1 = require("../../../../controller/middlewares/authorization-middleware");
const zod_1 = __importDefault(require("zod"));
exports.route = express_1.default.Router();
const organization_module_1 = __importDefault(require("../../../services/organization-module"));
exports.route.use((0, cors_1.default)({
    origin: ['http://localhost:4200', 'http://localhost:3000', 'https://dash.pricyn.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
exports.route.get('/all', authorization_middleware_1.authorizationMiddleware, async (req, res) => {
    res.json(await organization_module_1.default.getAllOrganizations(req.user.uid));
});
exports.route.get('/:id', authorization_middleware_1.authorizationMiddleware, async (req, res) => {
    const orgId = zod_1.default.object({
        id: zod_1.default.string()
    }).parse(req.params);
    res.json(await organization_module_1.default.organizationExists(orgId.id));
});
//# sourceMappingURL=organization-routing.module.js.map