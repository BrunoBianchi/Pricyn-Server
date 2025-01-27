"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
exports.api = express_1.default.Router();
exports.api.use('/user', require('./user/user-module').route);
exports.api.use('/oauth', require('./oauth/oauth-routing.module').route);
exports.api.use('/auth', require('./auth/auth-module').route);
exports.api.use('/mail', require('./mail/mail-module').route);
exports.api.use('/products', require('./products/products-module').route);
exports.api.use('/wishlist', require('./wishlist/wishlist-module').route);
exports.api.use('/forward-url', require('./forward-urls/forward-url.module').route);
exports.api.use('/notifications', require('./notifications/notifications-routing.module').route);
exports.api.use('/payments', require('./payments/payments-routing.module').route);
//# sourceMappingURL=api-routing.module.js.map