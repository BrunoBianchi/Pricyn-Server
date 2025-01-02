"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
exports.api = express_1.default.Router();
const crude_module_1 = __importDefault(require("../../services/crude-module"));
const jwt_module_1 = __importDefault(require("../../services/jwt-module"));
const zod_1 = require("zod");
exports.api.post('/sign-up', async (req, res) => {
    try {
        const user = zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
            password: zod_1.z.string(),
        }).parse(req.body);
        const data = await crude_module_1.default.createNewUser({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        const token = await jwt_module_1.default.signIn(data.data);
        res.status(data.status).json({ message: data.message, data: token });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//# sourceMappingURL=api-module.js.map