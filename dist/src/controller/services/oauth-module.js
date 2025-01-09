"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OauthModule {
    async generateStripeLink(uid) {
        const state = uid;
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