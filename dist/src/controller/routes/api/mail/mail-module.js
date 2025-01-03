"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const crude_module_1 = __importDefault(require("../../../services/crude-module"));
const authorization_middleware_1 = require("../../../middlewares/authorization-middleware");
const email_module_1 = __importDefault(require("../../../services/email-module"));
exports.route.use((0, cors_1.default)({
    origin: ['https://api.pricyn.com', 'https://dash.pricyn.com', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}));
exports.route.get('/verify-email', async (req, res) => {
    try {
        const token = req.query.token;
        let user = await crude_module_1.default.findByVerificatioUID(token);
        if (user.isActive)
            res.status(400).json({ message: 'Email already verified!' });
        user.isActive = true;
        user = await crude_module_1.default.updateUser(user);
        req.user = user;
        res.redirect('https://dash.pricyn.com/');
    }
    catch (err) {
        res.status(400).json({ message: 'Bad Request' });
    }
});
exports.route.post('/resend-verification-email', authorization_middleware_1.authorizationMiddleware, async (req, res) => {
    try {
        email_module_1.default.sendVerificationEmail(req.user.email, 'Verify your email for Pricyn');
        res.status(200).json({ message: 'Verification email sent' });
    }
    catch (err) {
        res.status(400).json({ message: 'Bad Request' });
    }
});
//# sourceMappingURL=mail-module.js.map