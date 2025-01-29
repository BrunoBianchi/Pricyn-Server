"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routing = (0, express_1.Router)();
const express_rate_limit_1 = require("express-rate-limit");
const apiLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
routing.use('', apiLimiter);
routing.use('', require('./api/api-routing.module').api);
routing.use('/blog', require('./blog/blog-routing.module').route);
exports.default = routing;
//# sourceMappingURL=routes-routing-module.js.map