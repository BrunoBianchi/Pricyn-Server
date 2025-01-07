"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crude_module_1 = __importDefault(require("./crude-module"));
class ConnectionsModule {
    async addConnection(user, connection) {
        if (!user.connections) {
            user.connections = [];
        }
        if (this.getConnection(user, connection.name))
            return user;
        user.connections.push(connection);
        await crude_module_1.default.updateUser(user);
        return user;
    }
    getConnection(user, name) {
        if (!user.connections || user.connections.length <= 0) {
            return null;
        }
        return user.connections.find(connection => connection.name === name);
    }
}
exports.default = new ConnectionsModule();
//# sourceMappingURL=connections-module.js.map