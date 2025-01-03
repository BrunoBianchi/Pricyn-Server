"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routing = (0, express_1.Router)();
const express_rate_limit_1 = require("express-rate-limit");
const apiLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
routing.use('', apiLimiter);
routing.use('', require('./api/api-routing.module').api);
exports.default = routing;
//# sourceMappingURL=routes-routing-module.js.map