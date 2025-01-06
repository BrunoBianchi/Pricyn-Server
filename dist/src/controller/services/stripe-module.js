"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class StripeModule {
    async getProducts(access_token) {
        const url = new URL('https://api.stripe.com/v1/prices');
        url.searchParams.append('expand[]', 'data.product');
        // Obter os preços com os produtos expandidos
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${access_token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const data = await response.json();
        // Agrupar os preços por produto
        const groupedProducts = data.data.reduce((acc, price) => {
            const productId = price.product.id;
            // Verificar se o produto já existe no agrupamento
            if (!acc[productId]) {
                acc[productId] = {
                    id: productId,
                    name: price.product.name,
                    description: price.product.description,
                    active: price.product.active,
                    prices: []
                };
            }
            // Adicionar o preço ao produto correspondente
            acc[productId].prices.push({
                id: price.id,
                unit_amount: price.unit_amount,
                currency: price.currency,
                recurring: price.recurring,
                nickname: price.nickname
            });
            return acc;
        }, {});
        // Converter o objeto em uma lista
        return Object.values(groupedProducts);
    }
}
exports.default = new StripeModule();
//# sourceMappingURL=stripe-module.js.map