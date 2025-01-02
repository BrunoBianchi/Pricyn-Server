"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jose = __importStar(require("jose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = 'HS256';
class JWT {
    async signIn(user) {
        const jwt = await new jose.SignJWT({ user })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:Pricyn:Server')
            .setAudience('urn:Pricyn:Client&Server')
            .setExpirationTime('2h')
            .sign(secret);
        return jwt;
    }
    async verify(token) {
        try {
            const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
                issuer: 'urn:Pricyn:Server',
                audience: 'urn:Pricyn:Client&Server',
            });
            return payload.user ? payload.user : false;
        }
        catch (err) {
            throw new Error('Unauthorize');
        }
    }
}
exports.JWT = JWT;
exports.default = new JWT();
//# sourceMappingURL=jwt-module.js.map