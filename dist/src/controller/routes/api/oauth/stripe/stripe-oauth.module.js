"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const oauth_module_1 = __importDefault(require("../../../../services/oauth-module"));
exports.route.use((0, cors_1.default)({
    origin: ['https://dash.pricyn.com', 'https://www.pricyn.com', 'https://pricyn.com', 'http://localhost:3000', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}));
exports.route.get('/login', async (req, res) => {
    res.redirect(await oauth_module_1.default.generateStripeLink());
});
exports.route.get('/callback', async (req, res) => {
    const { code, state } = req.query;
    try {
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: code,
        });
        // Ao invés de retornar JSON, enviar mensagem para janela principal
        res.send(`
        <script>
          window.opener.postMessage(
            { 
              type: 'stripe-connect-callback', 
              access_token: '${response.access_token}',
              refresh_token: '${response.refresh_token}',
              stripe_user_id: '${response.stripe_user_id}',
            }, 
            '*'
          );
          window.close();
        </script>
      `);
    }
    catch (err) {
        res.status(500).send('Falha ao conectar a conta.');
    }
});
//# sourceMappingURL=stripe-oauth.module.js.map