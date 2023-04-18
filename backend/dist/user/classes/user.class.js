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
exports.User = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ type: 'number', format: 'uuid' }),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({ name: 'userId' }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(42),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ name: 'userName' }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(32),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ name: 'password' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Length)(5),
    (0, swagger_1.ApiProperty)({ type: 'string' }),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ name: 'mainCity' }),
    __metadata("design:type", String)
], User.prototype, "mainCity", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], User);
exports.User = User;
//# sourceMappingURL=user.class.js.map