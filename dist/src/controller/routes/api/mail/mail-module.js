"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const jwt_module_1 = __importDefault(require("../../../services/jwt-module"));
const crude_module_1 = __importDefault(require("../../../services/crude-module"));
exports.route.use((0, cors_1.default)({
    origin: ['https://api.pricyn.com'],
    optionsSuccessStatus: 200
}));
exports.route.get('', (req, res) => {
    res.send('a');
});
exports.route.get('/verify-email', async (req, res) => {
    try {
        const token = req.query.token;
        if (!token)
            res.status(400).json({ message: 'Email is required' });
        const match = await jwt_module_1.default.verify(token);
        let user = await crude_module_1.default.findByEmail(match.email.trim());
        user.isActive = true;
        user = await crude_module_1.default.updateUser(user);
        res.redirect('https://dash.pricyn.com/');
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//# sourceMappingURL=mail-module.js.map