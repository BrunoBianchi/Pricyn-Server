"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const jwt_module_1 = __importDefault(require("../services/jwt-module"));
// Middleware de autorização
const authorizationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // Verifica se o cabeçalho de autorização existe e segue o formato "Bearer token"
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Extrai o token do cabeçalho
        const token = authHeader.split("Bearer ")[1].trim();
        // Verifica o token e adiciona as informações do usuário à requisição
        const payload = await jwt_module_1.default.verify(token);
        if (!payload) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = payload; // Adiciona o usuário à requisição
        next(); // Passa para o próximo middleware
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorization-middleware.js.map