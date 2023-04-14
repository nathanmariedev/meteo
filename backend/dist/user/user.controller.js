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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const user_class_1 = require("./classes/user.class");
const user_service_1 = require("./user.service");
const response_interceptor_1 = require("../response.interceptor");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findById(id) {
        const user = await this.userService.findOneById(id);
        console.log("A");
        console.log(user);
        console.log("B");
        return user;
    }
    async add(userToAdd) {
        const user = await this.userService.add(userToAdd);
        return user;
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Not Found" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('/:id'),
    (0, common_1.Post)('brands/:brandId/template-photo'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('access')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_class_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "add", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Not authorized' }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map