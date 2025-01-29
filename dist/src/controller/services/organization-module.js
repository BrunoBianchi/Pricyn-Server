"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../database/data-source");
const Organizations_1 = require("../../database/entity/Organizations");
class Organization {
    async createOrganization(org) {
        if (await this.organizationExists(org.uid)) {
            return this.upateOrganization(org);
        }
        else {
            const obj = data_source_1.AppDataSource.manager.create(Organizations_1.Organizations, org);
            return await data_source_1.AppDataSource.manager.save(obj);
        }
    }
    async organizationExists(uid) {
        return await data_source_1.AppDataSource.manager.findOneBy(Organizations_1.Organizations, { uid });
    }
    async getAllOrganizations(owner) {
        return await data_source_1.AppDataSource.manager.find(Organizations_1.Organizations, { where: { owner } });
    }
    async upateOrganization(org) {
        let orgDB = await this.organizationExists(org.uid);
        if (orgDB) {
            orgDB = org;
            return await data_source_1.AppDataSource.manager.save(orgDB);
        }
        throw new Error('Organization does not exist');
    }
}
exports.default = new Organization();
//# sourceMappingURL=organization-module.js.map