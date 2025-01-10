"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_1 = require("./entity/User");
const Products_1 = require("./entity/Products");
const wishList_1 = require("./entity/wishList");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "cockroachdb",
    url: process.env.DATABASE_URL,
    ssl: true,
    extra: {
        application_name: "docs_simplecrud_typeorm"
    },
    synchronize: true,
    logging: false,
    entities: [User_1.User, Products_1.Products, wishList_1.WishList],
    entitySkipConstructor: true,
    timeTravelQueries: false
});
//# sourceMappingURL=data-source.js.map