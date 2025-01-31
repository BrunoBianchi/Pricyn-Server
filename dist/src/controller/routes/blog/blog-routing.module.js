"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../../../database/data-source");
const Posts_1 = require("../../../database/entity/Posts");
exports.route = express_1.default.Router();
const zod_1 = __importDefault(require("zod"));
exports.route.post('/posts/', (0, cors_1.default)({
    methods: ['POST'],
    origin: ['https://docs.google.com'],
    optionsSuccessStatus: 200
}), async (req, res) => {
    try {
        const post = zod_1.default.object({
            title: zod_1.default.string(),
            description: zod_1.default.string(),
            images: zod_1.default.string().optional(),
            markdown: zod_1.default.string().optional(),
            category: zod_1.default.array(zod_1.default.string())
        }).parse(req.body);
        const obj = data_source_1.AppDataSource.manager.create(Posts_1.Posts, post);
        res.json(await data_source_1.AppDataSource.manager.save(obj));
    }
    catch (err) {
        res.status(400).json({ message: "Couldn't create post" });
    }
});
exports.route.get('/posts/', async (req, res) => {
    try {
        res.json(await data_source_1.AppDataSource.manager.find(Posts_1.Posts));
    }
    catch (err) {
        res.status(400).json({ message: "Couldn't get post" });
    }
});
exports.route.get('/posts/:title', async (req, res) => {
    try {
        const postTitle = req.params.title;
        if (!postTitle)
            res.json({ message: "No title provided" });
        res.json(await data_source_1.AppDataSource.manager.findOne(Posts_1.Posts, { where: { title: postTitle } }));
    }
    catch (err) {
        res.status(400).json({ message: "Couldn't get post" });
    }
});
exports.route.get('/posts-latest', async (req, res) => {
    try {
        const postRepository = data_source_1.AppDataSource.getRepository(Posts_1.Posts);
        const latestPost = await postRepository.find({
            order: {
                createdAt: 'DESC'
            },
            take: 3,
            cache: true
        });
        res.json(latestPost || null);
    }
    catch (err) {
        res.status(400).json({ message: "Couldn't get post" });
    }
});
//# sourceMappingURL=blog-routing.module.js.map