"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeMiddleware = void 0;
// Middleware de autorização
const stripeMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.stripeauthorization;
        // Verifica se o cabeçalho de autorização existe e segue o formato "Bearer token"
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user.stripe = authHeader;
        next(); // Passa para o próximo middleware
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.stripeMiddleware = stripeMiddleware;
//# sourceMappingURL=stripe-middleware.js.map