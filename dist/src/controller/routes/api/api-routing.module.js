"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const fs_1 = require("fs");
const express_1 = __importDefault(require("express"));
exports.api = express_1.default.Router();
(0, fs_1.readdir)(__dirname, (err, dir) => {
    if (err)
        throw err;
    dir = dir.filter((file) => !file.endsWith('.ts'));
    dir.forEach((d) => {
        (0, fs_1.readdir)(__dirname + `/${d}`, (err, files) => {
            if (files.length > 0) {
                files.forEach(f => {
                    exports.api.use(`/${d}/`, require(`./${d}/${f}`).route);
                });
            }
        });
    });
});
//# sourceMappingURL=api-routing.module.js.map