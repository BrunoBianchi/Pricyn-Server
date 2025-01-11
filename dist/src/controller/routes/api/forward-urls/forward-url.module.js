"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
exports.route = express_1.default.Router();
const cors_1 = __importDefault(require("cors"));
const forward_urls_module_1 = __importDefault(require("../../../services/forward-urls-module"));
exports.route.use((0, cors_1.default)({
    origin: ['https://join.pricyn.com', 'https://api.pricyn.com', 'https://dash.pricyn.com', 'http://localhost:4200'],
    optionsSuccessStatus: 200
}));
exports.route.get('/get-urls', async (req, res) => {
    try {
        const urls = await forward_urls_module_1.default.getForwardUrls();
        res.status(200).json({ urls });
    }
    catch (err) {
        res.status(400).json({ message: 'Bad Request' });
    }
});
exports.route.post('/add/:url', async (req, res) => {
    try {
        const url = req.params.url;
        const newUrl = await forward_urls_module_1.default.addForward(url);
        res.status(200).json({ message: 'Url added', newUrl });
    }
    catch (err) {
        res.status(400).json({ message: 'Bad Request' });
    }
});
//# sourceMappingURL=forward-url.module.js.map