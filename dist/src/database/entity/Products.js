"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Products = class Products {
    constructor() {
        this.createdAt = new Date();
    }
    generateUid() {
        this.searchId = (0, uuid_1.v4)();
    }
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'uid',
        type: 'string',
    }),
    __metadata("design:type", String)
], Products.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 100,
    }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'owner',
        type: 'string'
    }),
    __metadata("design:type", String)
], Products.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'string',
        default: 'active'
    }),
    __metadata("design:type", String)
], Products.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'searchId',
        type: 'string',
    }),
    __metadata("design:type", String)
], Products.prototype, "searchId", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Products.prototype, "generateUid", null);
__decorate([
    (0, typeorm_1.Column)({
        name: 'impressions',
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], Products.prototype, "impressions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'clicks',
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], Products.prototype, "clicks", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sales',
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], Products.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'provider',
        type: 'string',
        default: 'pricyn'
    }),
    __metadata("design:type", String)
], Products.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'prices',
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: true
    }),
    __metadata("design:type", Array)
], Products.prototype, "prices", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)({
        name: 'products',
        schema: 'public'
    })
], Products);
//# sourceMappingURL=Products.js.map