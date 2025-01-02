"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routing = (0, express_1.Router)();
routing.use('/api', require('./api/api-routing.module').api);
exports.default = routing;
//# sourceMappingURL=routes-routing-module.js.map