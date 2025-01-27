"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = require("../../database/entity/Products"); // Certifique-se de que o caminho está correto
const data_source_1 = require("../../database/data-source");
const stripe_module_1 = __importDefault(require("./stripe-module"));
class ProductsModule {
    constructor() {
        this.productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
    }
    async createProduct(product, owner, authToken) {
        try {
            if (product.uid) {
                const existingProduct = await this.findProductByUid(product.uid);
                if (existingProduct) {
                    const stripeProduct = await stripe_module_1.default.createProduct(product, authToken);
                    Object.assign(existingProduct, Object.assign(Object.assign({}, product), { stripeId: stripeProduct.id }));
                    return {
                        status: 200,
                        message: 'Product updated',
                        data: await this.productRepository.save(existingProduct)
                    };
                }
            }
            const stripeProduct = await stripe_module_1.default.createProduct(product, authToken);
            const newProduct = this.productRepository.create(Object.assign(Object.assign({}, product), { owner, uid: stripeProduct.id, stripeId: stripeProduct.id, createdAt: new Date() }));
            return {
                status: 200,
                message: 'Product created',
                data: await this.productRepository.save(newProduct)
            };
        }
        catch (error) {
            console.error('Error creating product:', error);
            return {
                status: 500,
                message: 'Error creating product',
                error: error.message
            };
        }
    }
    async incrementProductInformation(productId, amount) {
        let existingProduct = await this.findProductByUid(productId);
        existingProduct.sales = Number(Number(existingProduct.sales) + amount);
        existingProduct.clicks = Number(Number(existingProduct.clicks) + 1);
        existingProduct.impressions = Number(Number(existingProduct.impressions) + 1);
        return await this.productRepository.save(existingProduct);
    }
    async updateProduct(product) {
        try {
            const existingProduct = await this.findProductByUid(product.uid);
            if (existingProduct) {
                Object.assign(existingProduct, product);
                return {
                    status: 200,
                    message: 'Product updated',
                    data: await this.productRepository.save(existingProduct)
                };
            }
            return {
                status: 404,
                message: 'Product not found'
            };
        }
        catch (error) {
            console.error('Error updating product:', error);
            return {
                status: 500,
                message: 'Error updating product',
                error: error.message
            };
        }
    }
    async findProductByUid(uid) {
        return await this.productRepository.findOneBy({ uid });
    }
    async findProdutBySearchId(searchId) {
        return await this.productRepository.findOneBy({ searchId });
    }
    async getProductByOwner(owner) {
        return await this.productRepository.findBy({ owner });
    }
    createProductProvider(product, access_token) {
        stripe_module_1.default.createProduct(product, access_token);
    }
    async getProductByOwnerAndProvider(owner, provider) {
        return await this.productRepository.findBy({ owner, provider });
    }
    async mergeProducts(products1, products2) {
        return [...products1, ...products2.filter((p) => { return !products1.find((p1) => { return p1.uid === p.id; }); })];
    }
}
exports.default = new ProductsModule();
//# sourceMappingURL=products-module.js.map