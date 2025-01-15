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
const crude_module_1 = __importDefault(require("../../../../services/crude-module"));
const connections_module_1 = __importDefault(require("../../../../services/connections-module"));
const oauth_module_1 = __importDefault(require("../../../../services/oauth-module"));
const notifications_module_1 = __importDefault(require("../../../../services/notifications-module"));
exports.route.use((0, cors_1.default)({
    origin: ['https://dash.pricyn.com', 'https://www.pricyn.com', 'https://pricyn.com', 'http://localhost:3000', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}));
exports.route.get('/login', async (req, res) => {
    const uid = req.query.uid;
    const url = await oauth_module_1.default.generateStripeLink(uid);
    return res.redirect(url);
});
exports.route.get('/callback', async (req, res) => {
    const { code, state } = req.query;
    try {
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: code,
        });
        const user = await crude_module_1.default.findByUID(state);
        const connection = {
            name: 'stripe',
            id: response.stripe_user_id,
        };
        await connections_module_1.default.addConnection(user, connection);
        await notifications_module_1.default.addNotification({
            userUid: user.uid, header: 'Stripe Account Connected!', content: ` #### [Products](/products) 🌐`, read: false
        }).then(a => {
            console.log(a);
        });
        res.send(`
        <script>
          window.opener.postMessage(
            { 
              type: 'stripe-connect-callback', 
              access_token: '${response.access_token}',
              refresh_token: '${response.refresh_token}',
              user: '${JSON.stringify(user)}',
            }, 
            '*'
          );
          window.close();
        </script>
      `);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Falha ao conectar a conta.');
    }
});
//# sourceMappingURL=stripe-oauth.module.js.map