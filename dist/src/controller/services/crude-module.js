"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../database/entity/User");
const data_source_1 = require("../../database/data-source");
const bcrypt_module_1 = __importDefault(require("./bcrypt-module"));
class CrudeModule {
    async createNewUser(user) {
        const existing = await this.findByEmail(user.email);
        if (!existing) {
            const obj = data_source_1.AppDataSource.manager.create(User_1.User, user);
            return { status: 200, message: 'User created', data: await data_source_1.AppDataSource.manager.save(obj) };
        }
        throw new Error('User already exists');
    }
    async findByEmail(email) {
        return await data_source_1.AppDataSource.manager.findOneBy(User_1.User, { email });
    }
    async findByEmaiAndPassword(email, password) {
        const user = await this.findByEmail(email);
        if (user) {
            const match = await bcrypt_module_1.default.compare(password, user.password);
            if (match) {
                return user;
            }
        }
    }
    async updateUser(newUser) {
        let user = await this.findByEmail(newUser.email);
        if (user) {
            user = newUser;
            return await data_source_1.AppDataSource.manager.save(user);
        }
        throw new Error('User does not exist');
    }
}
exports.default = new CrudeModule();
//# sourceMappingURL=crude-module.js.map