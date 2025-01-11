"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForwardUrlsModule = void 0;
const data_source_1 = require("../../database/data-source");
const ForwardUrls_1 = require("../../database/entity/ForwardUrls");
class ForwardUrlsModule {
    async addForward(link) {
        if (await this.urlExists(link)) {
            return await this.increaseUrl(await this.urlExists(link));
        }
        else {
            const obj = data_source_1.AppDataSource.manager.create(ForwardUrls_1.ForwardUrls, { link });
            return await data_source_1.AppDataSource.manager.save(obj);
        }
    }
    async urlExists(link) {
        return await data_source_1.AppDataSource.manager.findOneBy(ForwardUrls_1.ForwardUrls, { link });
    }
    async increaseUrl(object) {
        object.uses++;
        return await data_source_1.AppDataSource.manager.save(object);
    }
    async getForwardUrls() {
        return await data_source_1.AppDataSource.manager.find(ForwardUrls_1.ForwardUrls);
    }
}
exports.ForwardUrlsModule = ForwardUrlsModule;
exports.default = new ForwardUrlsModule();
//# sourceMappingURL=forward-urls-module.js.map