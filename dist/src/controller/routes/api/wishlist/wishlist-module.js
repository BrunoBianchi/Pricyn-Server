"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
const zod_1 = require("zod");
const wishlist_module_1 = __importDefault(require("../../../services/wishlist-module"));
const email_module_1 = __importDefault(require("../../../services/email-module"));
exports.route.post('/subscribe', async (req, res) => {
    try {
        const schema = zod_1.z.object({
            email: zod_1.z.string().email()
        }).parse(req.body);
        await wishlist_module_1.default.subscribe(schema.email);
        email_module_1.default.sendWishlist(schema.email, 'Welcome to Pricyn Wishlist!');
        res.json({ message: "Subscribed successfully!" });
    }
    catch (err) {
        res.status(400).json({ error: "Could not subscribe, try again later!" });
    }
});
//# sourceMappingURL=wishlist-module.js.map