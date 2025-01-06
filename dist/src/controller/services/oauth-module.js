"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class OauthModule {
    async generateStripeLink() {
        const state = (0, uuid_1.v4)();
        const args = new URLSearchParams({
            state,
            client_id: process.env.STRIPE_CLIENT_ID,
            scope: "read_write",
            response_type: "code",
        });
        return `https://connect.stripe.com/oauth/authorize?${args.toString()}`;
    }
}
exports.default = new OauthModule();
//# sourceMappingURL=oauth-module.js.map