"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class StripeModule {
    constructor() {
        this.baseUrl = 'https://api.stripe.com/v1';
    }
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
        console.log(data);
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
        console.log(groupedProducts);
        // Converter o objeto em uma lista
        return Object.values(groupedProducts);
    }
    async createProduct(product, access_token) {
        var _a;
        try {
            // Criar o produto
            const productResponse = await fetch(`${this.baseUrl}/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: this.toFormData(Object.assign({ name: product.name, description: product.description }, product.metadata))
            });
            const productData = await productResponse.json();
            if (!productResponse.ok) {
                throw new Error(((_a = productData.error) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to create product');
            }
            // Criar os preços, se existirem
            if (productData.id && product.prices && product.prices.length > 0) {
                const pricePromises = product.prices.map(price => this.createPrice(productData.id, price, access_token));
                const prices = await Promise.all(pricePromises);
                return Object.assign(Object.assign({}, productData), { prices });
            }
            return productData;
        }
        catch (error) {
            console.error('Stripe API Error:', error);
            throw error;
        }
    }
    async createPrice(productId, price, access_token) {
        var _a;
        try {
            // Preparar o corpo da requisição
            const bodyData = {
                product: productId,
                currency: price.currency,
                unit_amount: price.unit_amount * 100,
            };
            // Adicionar o campo "recurring" apenas se ele existir
            if (price.recurring) {
                bodyData.recurring = price.recurring;
            }
            // Criar o preço
            const priceResponse = await fetch(`${this.baseUrl}/prices`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: this.toFormData(bodyData)
            });
            const priceData = await priceResponse.json();
            if (!priceResponse.ok) {
                throw new Error(((_a = priceData.error) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to create price');
            }
            return priceData;
        }
        catch (error) {
            console.error('Stripe API Error (createPrice):', error);
            throw error;
        }
    }
    toFormData(data) {
        return Object.entries(data)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => {
            if (typeof value === 'object' && !Array.isArray(value)) {
                // Para objetos, iteramos sobre as chaves e valores internos
                return Object.entries(value)
                    .map(([subKey, subValue]) => `${key}[${subKey}]=${encodeURIComponent(String(subValue))}`)
                    .join('&');
            }
            return `${key}=${encodeURIComponent(String(value))}`;
        })
            .join('&');
    }
    async getSubsscription(subscription_id, access_token) {
        const subscription = await fetch(`${this.baseUrl}/subscriptions/${subscription_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        });
    }
}
exports.default = new StripeModule();
//# sourceMappingURL=stripe-module.js.map