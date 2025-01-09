"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = require("../../database/entity/Products");
const data_source_1 = require("../../database/data-source");
class ProductsModule {
    async createProduct(product, owner) {
        product.owner = owner;
        if (await this.findProductByUid(product.uid)) {
            throw new Error('Product already exists');
        }
        const obj = data_source_1.AppDataSource.manager.create(Products_1.Products, product);
        return { status: 200, message: 'Product created', data: await data_source_1.AppDataSource.manager.save(obj) };
    }
    async findProductByUid(uid) {
        return await data_source_1.AppDataSource.manager.findOneBy(Products_1.Products, { uid });
    }
    async getProductByOwnerAndProvider(owner, provider) {
        return await data_source_1.AppDataSource.manager.findBy(Products_1.Products, { owner, provider });
    }
    async margeProducts(products1, products2) {
        return [...products1, ...products2.filter((p) => { return !products1.find((p1) => { return p1.uid === p.id; }); })];
    }
}
exports.default = new ProductsModule();
//# sourceMappingURL=products-module.js.map