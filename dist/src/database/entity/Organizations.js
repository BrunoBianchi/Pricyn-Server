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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organizations = void 0;
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
let Organizations = class Organizations {
    constructor() {
        this.createdAt = new Date();
        this.plan = {
            name: 'Free',
            expires: (0, moment_1.default)().add(1, 'month').toDate()
        };
    }
    generateUid() {
        this.uid = `org_${(0, uuid_1.v4)()}`;
    }
};
exports.Organizations = Organizations;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Organizations.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'string',
    }),
    __metadata("design:type", String)
], Organizations.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], Organizations.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'plan',
        type: 'jsonb',
    }),
    __metadata("design:type", Object)
], Organizations.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'uid',
        type: 'string',
    }),
    __metadata("design:type", String)
], Organizations.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Organizations.prototype, "generateUid", null);
__decorate([
    (0, typeorm_1.Column)({
        name: 'owner',
        type: 'string',
    }),
    __metadata("design:type", String)
], Organizations.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'sales',
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
    }),
    __metadata("design:type", Array)
], Organizations.prototype, "sales", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'connections',
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: true
    }),
    __metadata("design:type", Array)
], Organizations.prototype, "connections", void 0);
exports.Organizations = Organizations = __decorate([
    (0, typeorm_1.Entity)({
        name: 'organizations',
        schema: 'public'
    })
], Organizations);
//# sourceMappingURL=Organizations.js.map