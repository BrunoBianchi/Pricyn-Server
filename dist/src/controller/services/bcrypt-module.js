"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptModule {
    async hash(key) {
        const salt = await bcrypt_1.default.genSalt(10);
        return await bcrypt_1.default.hash(key, salt);
    }
    compare(key, hash) {
        return bcrypt_1.default.compare(key, hash);
    }
}
exports.default = new BcryptModule();
//# sourceMappingURL=bcrypt-module.js.map