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
exports.Posts = void 0;
const typeorm_1 = require("typeorm");
let Posts = class Posts {
    constructor() {
        this.createdAt = new Date();
    }
};
exports.Posts = Posts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
        type: 'int',
    }),
    __metadata("design:type", Number)
], Posts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'title',
        type: 'string',
    }),
    __metadata("design:type", String)
], Posts.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'string',
    }),
    __metadata("design:type", String)
], Posts.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'markdown',
        type: 'string',
    }),
    __metadata("design:type", String)
], Posts.prototype, "markdown", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], Posts.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'images',
        type: 'string',
        nullable: true
    }),
    __metadata("design:type", String)
], Posts.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'category',
        type: 'jsonb',
        array: false,
        default: () => "'[]'",
        nullable: true
    }),
    __metadata("design:type", Array)
], Posts.prototype, "category", void 0);
exports.Posts = Posts = __decorate([
    (0, typeorm_1.Entity)({
        name: 'posts',
        schema: 'public'
    })
], Posts);
//# sourceMappingURL=Posts.js.map