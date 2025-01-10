"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wishList_1 = require("../../database/entity/wishList");
const data_source_1 = require("../../database/data-source");
class WishListModule {
    async subscribe(email) {
        if (await this.emailExists(email))
            throw new Error('Email already exists');
        const obj = data_source_1.AppDataSource.manager.create(wishList_1.WishList, { email });
        return await data_source_1.AppDataSource.manager.save(obj);
    }
    async emailExists(email) {
        return await data_source_1.AppDataSource.manager.findOneBy(wishList_1.WishList, { email });
    }
}
exports.default = new WishListModule();
//# sourceMappingURL=wishlist-module.js.map