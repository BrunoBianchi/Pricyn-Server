"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
const crude_module_1 = __importDefault(require("../../../services/crude-module"));
const jwt_module_1 = __importDefault(require("../../../services/jwt-module"));
const zod_1 = require("zod");
const cors_1 = __importDefault(require("cors"));
const email_module_1 = __importDefault(require("../../../services/email-module"));
exports.route.use((0, cors_1.default)({
    origin: ['https://dash.pricyn.com', 'http://localhost:3000', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}));
exports.route.post('/sign-up', async (req, res) => {
    try {
        const user = zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
            password: zod_1.z.string(),
            newsletter: zod_1.z.boolean()
        }).parse(req.body);
        const data = await crude_module_1.default.createNewUser({
            name: user.name,
            email: user.email,
            password: user.password,
            newsletter: user.newsletter
        });
        const token = await jwt_module_1.default.signIn(data.data);
        res.status(data.status).json({ message: data.message, data: token });
        email_module_1.default.sendVerificationEmail(user.email, 'Verify your email for Pricyn');
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.route.post('/login', async (req, res) => {
    try {
        const body = zod_1.z.object({
            email: zod_1.z.string(),
            password: zod_1.z.string(),
        }).parse(req.body);
        const user = await crude_module_1.default.findByEmaiAndPassword(body.email, body.password);
        console.log(user);
        if (!user)
            throw new Error('Email Or Password is incorrect');
        const token = await jwt_module_1.default.signIn(user);
        res.status(200).json({ message: 'Logged in ', data: token });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Email Or Password is incorrect' });
    }
});
//# sourceMappingURL=auth-module.js.map