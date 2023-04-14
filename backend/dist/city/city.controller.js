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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_interceptor_1 = require("../response.interceptor");
const city_service_1 = require("./city.service");
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    async findById(insee) {
        console.log("City?");
        const city = await this.cityService.findOneById(insee);
        console.log(city);
        return city;
    }
    async findByQuery(query) {
        console.log("City?");
        const city = await this.cityService.findByQuery(query);
        console.log(city);
        return city;
    }
};
__decorate([
    (0, common_1.Get)('/:insee'),
    (0, swagger_1.ApiNotFoundResponse)({ description: "Not Found" }),
    __param(0, (0, common_1.Param)('insee')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/find/:query'),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findByQuery", null);
CityController = __decorate([
    (0, common_1.Controller)('city'),
    (0, swagger_1.ApiTags)('City'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Not authorized' }),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
exports.CityController = CityController;
//# sourceMappingURL=city.controller.js.map