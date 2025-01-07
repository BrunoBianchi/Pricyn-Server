"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OauthModule {
    async generateStripeLink(uid) {
        console.log("aeae");
        const state = uid;
        const args = new URLSearchParams({
            state,
            client_id: process.env.STRIPE_CLIENT_ID,
            scope: "read_write",
            response_type: "code",
        });
        console.log("a");
        console.log(state);
        return `https://connect.stripe.com/oauth/authorize?${args.toString()}`;
    }
}
exports.default = new OauthModule();
//# sourceMappingURL=oauth-module.js.map