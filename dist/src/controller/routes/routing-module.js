"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routing = (0, express_1.Router)();
routing.use('/api', require('./api/api-module').api);
exports.default = routing;
//# sourceMappingURL=routing-module.js.map