"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organization_module_1 = __importDefault(require("./organization-module"));
class ConnectionsModule {
    async addConnection(organization, connection) {
        if (!organization)
            return null;
        if (!organization.connections) {
            organization.connections = [];
        }
        if (this.getConnection(organization, connection.name))
            return organization;
        organization.connections.push(connection);
        await organization_module_1.default.upateOrganization(organization);
        return organization;
    }
    getConnection(organization, name) {
        if (!organization.connections || organization.connections.length <= 0) {
            return null;
        }
        return organization.connections.find(connection => connection.name === name);
    }
}
exports.default = new ConnectionsModule();
//# sourceMappingURL=connections-module.js.map