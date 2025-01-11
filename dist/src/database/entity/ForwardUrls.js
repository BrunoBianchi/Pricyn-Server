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
exports.ForwardUrls = void 0;
const typeorm_1 = require("typeorm");
let ForwardUrls = class ForwardUrls {
    constructor() {
        this.uses = 1;
    }
};
exports.ForwardUrls = ForwardUrls;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'id',
        type: 'int',
    }),
    __metadata("design:type", Number)
], ForwardUrls.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'link',
        type: 'string',
    }),
    __metadata("design:type", String)
], ForwardUrls.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'uses',
        type: 'int',
        default: 1
    }),
    __metadata("design:type", Number)
], ForwardUrls.prototype, "uses", void 0);
exports.ForwardUrls = ForwardUrls = __decorate([
    (0, typeorm_1.Entity)({
        name: 'forwardurls',
        schema: 'public'
    })
], ForwardUrls);
//# sourceMappingURL=ForwardUrls.js.map