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
exports.Notifications = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Notifications = class Notifications {
    constructor() {
        this.createdAt = new Date();
    }
    async generateUid() {
        this.uid = (0, uuid_1.v4)();
    }
    ;
};
exports.Notifications = Notifications;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Notifications.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'uid',
        type: 'string',
    }),
    __metadata("design:type", String)
], Notifications.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Notifications.prototype, "generateUid", null);
__decorate([
    (0, typeorm_1.Column)({
        name: 'userUid',
        type: 'string',
    }),
    __metadata("design:type", String)
], Notifications.prototype, "userUid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'header',
        type: 'string',
    }),
    __metadata("design:type", String)
], Notifications.prototype, "header", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'content',
        type: 'string',
    }),
    __metadata("design:type", String)
], Notifications.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'createdAt',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Notifications.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'read',
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], Notifications.prototype, "read", void 0);
exports.Notifications = Notifications = __decorate([
    (0, typeorm_1.Entity)({
        name: 'notifications',
        schema: 'public'
    })
], Notifications);
//# sourceMappingURL=Notifications.js.map